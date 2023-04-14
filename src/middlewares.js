export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Melon-Clone-Contest";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
