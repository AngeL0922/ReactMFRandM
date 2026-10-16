type LogLevel = 'info' | 'warn' | 'error'
type LogContext = Record<string, unknown>

export function createLogger(mf: string) {
    const log = (level: LogLevel, message: string, context?: LogContext) => {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            mf,
            message,
            ...(context && { context }),
        }
        console[level](JSON.stringify(entry))
    }

    return {
        info: (message: string, context?: LogContext) => log('info', message, context),
        warn: (message: string, context?: LogContext) => log('warn', message, context),
        error: (message: string, context?: LogContext) => log('error', message, context),
    }
}

export const logger = createLogger('mf-characters')