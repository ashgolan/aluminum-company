import { model, Schema } from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    validate(value) {
      if (value.length < 8) throw Error("min length of password is 8 digits !");
    },
  },
});
userSchema.plugin(passportLocalMongoose);

export const User = new model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
