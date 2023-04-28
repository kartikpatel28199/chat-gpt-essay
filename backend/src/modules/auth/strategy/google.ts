import { Strategy } from "passport-google-oauth20";
import ENV from "../../../core/config/configuration";

export const google = async (passport) => {
  passport.use(
    "google",
    new Strategy(
      {
        clientID: ENV.googleClientId,
        clientSecret: ENV.googleClientSecret,
        callbackURL: ENV.googleRedirectUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };
        done(null, newUser);
      }
    )
  );
};
