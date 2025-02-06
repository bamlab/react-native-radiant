const SORTED_LOG_LEVELS = ['log', 'warn', 'error'] as const;

type LogLevel = (typeof SORTED_LOG_LEVELS)[number];

const DEFAULT_LOG_LEVEL: LogLevel = 'log';
const getLogLevel = () => {
  if (
    process.env.REACT_NATIVE_RADIANT_LOG_LEVEL &&
    process.env.REACT_NATIVE_RADIANT_LOG_LEVEL === 'off'
  ) {
    return false;
  }

  if (
    process.env.REACT_NATIVE_RADIANT_LOG_LEVEL &&
    (SORTED_LOG_LEVELS as ReadonlyArray<string>).includes(
      process.env.REACT_NATIVE_RADIANT_LOG_LEVEL,
    )
  ) {
    return process.env.REACT_NATIVE_RADIANT_LOG_LEVEL as LogLevel;
  }

  return DEFAULT_LOG_LEVEL;
};
const logLevel = getLogLevel();

const isLogLevelEnabled = (level: LogLevel): boolean => {
  return (
    logLevel !== false && SORTED_LOG_LEVELS.indexOf(level) >= SORTED_LOG_LEVELS.indexOf(logLevel)
  );
};

const dummyLog = () => {};
export const logger: Record<LogLevel, (message: string) => void> = {
  log: isLogLevelEnabled('log') ? console.log : dummyLog,
  warn: isLogLevelEnabled('warn') ? console.warn : dummyLog,
  error: isLogLevelEnabled('error') ? console.error : dummyLog,
};
