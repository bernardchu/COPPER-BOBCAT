// helper function to test authentication
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('not authenticated!');
  // res.redirect('/#/login');
  res.send('Forbidden');
}