const passport = require("passport");

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(
    passport.session({
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Set the cookie to expire in 1 day (in milliseconds)
      },
    })
  );
  //   app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  require("./strategies/local.strategy")();
};
