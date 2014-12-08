// helper function to test authentication
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send('Forbidden');
}