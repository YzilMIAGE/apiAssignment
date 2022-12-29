let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  lastName: String,
  firstName: String,
  mail: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", UserSchema);
