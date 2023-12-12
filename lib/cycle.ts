// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { clearInterval, setInterval } from 'timers'

/** Doing function, called when a job runs. */
export type DoFn = () => Promise<void>

/** Error callback function, called if a job fails with an uncaught error. */
export type ErrorFn = (job: JobInfo, err: unknown) => void

/** Informational callback function, called when a job starts and completes. */
export type InfoFn = (job: JobInfo) => void

/** A job wraps a doing function with some additional information and state. */
export type Job = {
  /** Doing function (task) */
  do: DoFn
  /** Job name */
  name: string
  /** Job interval (milliseconds) */
  interval: number
  /** Job deferment at startup (milliseconds) */
  defer?: number
  /** Job status after last run */
  status?: Status
  /** Maximum execution time for a job (milliseconds) */
  timeout?: number
}

/** Information about a job. */
export type JobInfo = Pick<Job, 'name' | 'status'>

/** Error representing failure to start a job because the previous execution has not completed. */
export class PreviousExecutionNotCompleteError extends Error {
  jobName: string
  status: string | undefined

  constructor(jobName: string, status: string | undefined, message: string) {
    super(message)
    this.name = 'PreviousExecutionNotCompleteError'
    this.jobName = jobName
    this.status = status
  }
}

/**
 * Error representing failure to complete a job within its timeout period, if one is set.
 *
 * **This does not mean the job has been cleaned up safely.**
 * If timeout errors are occuring regularly, either the timeout is too low or there is a problem with the job.
 */
export class TimeoutError extends Error {
  jobName: string
  status: string | undefined

  constructor(jobName: string, status: string | undefined, message: string) {
    super(message)
    this.name = 'TimeoutError'
    this.jobName = jobName
    this.status = status
  }
}

/** Job status. */
export type Status = 'error' | 'pending' | 'running' | undefined

/**
 * Wrap a job's doing function with status management, error handling, and callbacks.
 *
 * If an error handler is specified, the job will 'soft fail' by passing the error to that handler without forcing the
 * entire cycle to stop.
 */
export const prepare = (job: Job, before?: InfoFn, after?: InfoFn, onError?: ErrorFn): DoFn => {
  const doJob = job.do
  return async (): Promise<void> => {
    if (job.status === 'running') {
      const err = new PreviousExecutionNotCompleteError(job.name, job.status, '')
      if (onError) return onError(job, err)
      else throw err
    }

    before && before(job)
    job.status = 'running'
    try {
      if (job.timeout) {
        await new Promise((res, rej) => {
          const t = setTimeout(() => {
            rej(new TimeoutError(job.name, job.status, 'timed out'))
          }, job.timeout)

          doJob().then(res).finally(() => {
            if (t) clearTimeout(t)
          })
        })
      }
      else await doJob()
      job.status = 'pending'
      after && after(job)
    }
    catch (err) {
      job.status = 'error'
      if (onError) onError(job, err)
      else throw err
    }
  }
}

/**
 * Run a cycle, which executes any number of jobs in concert.
 * If one job fails, all jobs are cancelled.
 */
export const run = (jobs: Job[]): Promise<void> => new Promise((resolve, reject) => {
  const timeouts: NodeJS.Timeout[] = []
  const fail = (err: unknown) => {
    timeouts.forEach(clearInterval)
    reject(err)
  }

  jobs
    .map(job => ({ ...job, status: 'pending' }))
    .forEach(job => {
      const startJob = () => {
        const tick = () => job.do().catch(fail)
        timeouts.push(setInterval(tick, job.interval))
        tick()
      }
      if (job.defer) setTimeout(startJob, job.defer)
      else startJob()
    })
})

export const sequence = (...doFns: DoFn[]): DoFn => async () => {
  for (let i = 0; i < doFns.length; i++) {
    await doFns[i]()
  }
}
