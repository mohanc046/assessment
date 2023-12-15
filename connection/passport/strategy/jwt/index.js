const passport = require("passport");

const { config: { JWT_SECRET } } = require("../../../../utils/constant");

const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use("authenticate-user", new JWTStrategy(options, async function (jwtPayload, done) {
  if (jwtPayload.userId) return done(null, jwtPayload);
  return done(null, false);
}));
