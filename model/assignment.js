let mongoose = require("mongoose");
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
  nom: String,
  dateDeRendu: Date,
  rendu: Boolean,
  auteur: String,
  remarques: String,
  subjectId: { type: String, index: true },
  note: Number,
  matiere: { type: String, required: false },
  prof: { type: String, required: false },
});
AssignmentSchema.index({ nom: "text" });
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Assignment", AssignmentSchema);
