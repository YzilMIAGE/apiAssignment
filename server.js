let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let subject = require("./routes/subjects");
let user = require("./routes/user");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const uri =
  "mongodb+srv://clizy:1zuCPJMd4jGxhcmv@assignement.qitimgc.mongodb.net/assignments?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/assignments";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = "/api";

app.route(prefix + "/assignments").get(assignment.getAssignments);

app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app
  .route(prefix + "/assignments")
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + "/subjects/:id").get(subject.getSubjectHandler);

app.route(prefix + "/subjects").get(subject.getSubjectsHandler);

app.route(prefix + "/users/register").post(user.registerHandler);

app.route(prefix + "/users/login").post(user.loginHandler);

app.route(prefix + "/users/:id").get(user.getUserHandler);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;
