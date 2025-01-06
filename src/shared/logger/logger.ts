import { createLogger, format, transports } from 'winston';

// Create a logger instance
export const logger = createLogger({
  // level: 'debug', // Set the default log level
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.colorize(), // Colorize the output
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`; // Custom log format
    }),
    // format.simple(), // Use a simple format
    // format.timestamp(),
    // format.cli(),
  ),
  transports: [
    new transports.Console(), // Log to the console
  ],
});
