const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require("dotenv");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const BACKEND_URL = isProduction ? "https://weather-prediction-xfpl.onrender.com":"http://localhost:4000";

passport.use(new GoogleStrategy({
  clientID: "755121633595-usorn95fu0b5nasdtettbdr08rbjv3rb.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: `${BACKEND_URL}/auth/googleRedirect`,

},
function(accessToken, refreshToken, profile, done) {
    // Process user profile or save it to database
    console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
    return done(null, profile)
}
));



// module.exports = passport;