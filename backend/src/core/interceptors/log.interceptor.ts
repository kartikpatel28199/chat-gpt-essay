export const requestLoggerMiddleware =
  ({ logger }) =>
  (req, res, next) => {
    const log = {
      level: "info",
      timestamp: new Date(),
      method: req.method,
      path: req.url,
    };
    logger(JSON.stringify(log));
    next();
  };
