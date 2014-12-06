// Stores Oauth ID and secret information for whatever sites you want to use for authenticaion.
// The callbackURL is given to each site when registering, so it's not recommended you change it without changing info on the provider as well.
// The provider will redirect users to the callbackURL once authenticated, so there should be a route on the server corresponding to each one.
var ids = {
  github: {
    clientID: '3471681cd2d2d08808e9',
    clientSecret: '4280d9cb0d1ceed2d48e6fbd636f6214632980c1',
    callbackURL: "http://copperbob.azurewebsites.net/auth/github/callback"
  }
};
module.exports = ids;
