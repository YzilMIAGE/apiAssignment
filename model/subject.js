let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SubjectSchema = Schema({
  name: String,
  photoPath: String,
});

module.exports = mongoose.model("Subject", SubjectSchema);
