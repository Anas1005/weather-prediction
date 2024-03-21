const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require("dotenv");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const BACKEND_URL = isProduction ? "https://weather-prediction-xfpl.onrender.com":"http://localhost:4000";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${BACKEND_URL}/auth/googleRedirect`,

},
function(accessToken, refreshToken, profile, done) {
    // Process user profile or save it to database
    console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
    return done(null, profile)
}
));



// module.exports = passport;