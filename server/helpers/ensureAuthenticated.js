/**
  * @type function
  * @param {object} req request object from Express
  * @param {object} req request object from Express
  * @param {next} Callback function to execute upon success
  * Middleware function to use on routes that require authentication.
  * The server response "Forbidden" can be used on the client side to direct routing as well. (see QuestionsController)
  */
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send('Forbidden');
}