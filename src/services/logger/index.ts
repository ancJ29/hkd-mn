const logger = {
  info: (...args: unknown[]) => _log("[INFO]", ...args),
  error: (...args: unknown[]) => _log("[ERROR]", ...args),
};
export default logger;

function _log(...args: unknown[]) {
  _pushLogsToServer(...args);

  if (!localStorage.IS_LOGGER_ENABLE) return;
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toLocaleString()}]`, ...args);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _pushLogsToServer(...args: unknown[]) {
  // TODO: implement this later
}
