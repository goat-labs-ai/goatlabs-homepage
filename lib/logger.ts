/**
 * Simple structured logger for server-side logging
 * Outputs JSON to stdout for easy parsing in production (Vercel logs)
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  requestId?: string;
  [key: string]: unknown;
}

function log(level: LogLevel, message: string, context?: LogContext) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...context,
  };

  // In production, output as JSON for parsing
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(logEntry));
  } else {
    // In development, prettier output
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, context || '');
  }
}

export const logger = {
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, context?: LogContext) => log('error', message, context),
};
