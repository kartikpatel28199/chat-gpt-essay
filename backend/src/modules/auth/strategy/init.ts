import { google } from "./google";

export const initPassport = async (passport) => {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  google(passport);
};
