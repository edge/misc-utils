/** Doing function, called when a job runs. */
export type DoFn = () => Promise<void>;
/** Error callback function, called if a job fails with an uncaught error. */
export type ErrorFn = (job: JobInfo, err: unknown) => void;
/** Informational callback function, called when a job starts and completes. */
export type InfoFn = (job: JobInfo) => void;
/** A job wraps a doing function with some additional information and state. */
export type Job = {
    /** Doing function (task) */
    do: DoFn;
    /** Job name */
    name: string;
    /** Job interval (milliseconds) */
    interval: number;
    /** Job deferment at startup (milliseconds) */
    defer?: number;
    /** Job status after last run */
    status?: Status;
    /** Maximum execution time for a job (milliseconds) */
    timeout?: number;
};
/** Information about a job. */
export type JobInfo = Pick<Job, 'name' | 'status'>;
/** Error representing failure to start a job because the previous execution has not completed. */
export declare class PreviousExecutionNotCompleteError extends Error {
    jobName: string;
    status: string | undefined;
    constructor(jobName: string, status: string | undefined, message: string);
}
/**
 * Error representing failure to complete a job within its timeout period, if one is set.
 *
 * **This does not mean the job has been cleaned up safely.**
 * If timeout errors are occuring regularly, either the timeout is too low or there is a problem with the job.
 */
export declare class TimeoutError extends Error {
    jobName: string;
    status: string | undefined;
    constructor(jobName: string, status: string | undefined, message: string);
}
/** Job status. */
export type Status = 'error' | 'pending' | 'running' | undefined;
/**
 * Wrap a job's doing function with status management, error handling, and callbacks.
 *
 * If an error handler is specified, the job will 'soft fail' by passing the error to that handler without forcing the
 * entire cycle to stop.
 */
export declare const prepare: (job: Job, before?: InfoFn, after?: InfoFn, onError?: ErrorFn) => DoFn;
/**
 * Run a cycle, which executes any number of jobs in concert.
 * If one job fails, all jobs are cancelled.
 */
export declare const run: (jobs: Job[]) => Promise<void>;
export declare const sequence: (...doFns: DoFn[]) => DoFn;
