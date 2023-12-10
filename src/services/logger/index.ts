const logger = {
  info: (...args: unknown[]) => _log("[INFO]", ...args),
  error: (...args: unknown[]) => _log("[ERROR]", ...args),
};
export default logger;

function _log(...args: unknown[]) {
  _pushLogsToServer(...args);

  if (!localStorage.IS_LOGGER_ENABLE) return;
  console.log(`[${new Date().toLocaleString()}]`, ...args);
}

function _pushLogsToServer(...args: unknown[]) {
  // TODO: implement this later
}
