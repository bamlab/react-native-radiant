const THIRD_PARTY_LIBS = ['react-native-web'];

const isThirdPartyLibLoggingDisabled = () => {
  return (
    process.env.REACT_NATIVE_RADIANT_DISABLE_THIRD_PARTY_LOGS === 'true' ||
    process.env.REACT_NATIVE_RADIANT_DISABLE_THIRD_PARTY_LOGS === '1'
  );
};

const {
  log: originalLog,
  warn: originalWarn,
  error: originalError,
  debug: originalDebug,
  info: originalInfo,
} = console;

const isThirdPartyLibsLog = () => {
  const stack = new Error().stack;

  if (!stack) {
    return false;
  }

  return THIRD_PARTY_LIBS.some((lib) => stack.includes(lib));
};

export const overrideConsoleIfNeeded = () => {
  if (isThirdPartyLibLoggingDisabled()) {
    console.log = (...args) => {
      if (isThirdPartyLibsLog()) {
        return;
      }

      originalLog(args);
    };
    console.warn = (...args) => {
      if (isThirdPartyLibsLog()) {
        return;
      }

      originalWarn(args);
    };
    console.error = (...args) => {
      if (isThirdPartyLibsLog()) {
        return;
      }

      originalError(args);
    };
    console.debug = (...args) => {
      if (isThirdPartyLibsLog()) {
        return;
      }

      originalDebug(args);
    };
    console.info = (...args) => {
      if (isThirdPartyLibsLog()) {
        return;
      }

      originalInfo(args);
    };
  }
};

export const restoreConsole = () => {
  console.log = originalLog;
  console.warn = originalWarn;
  console.error = originalError;
  console.debug = originalDebug;
  console.info = originalInfo;
};
