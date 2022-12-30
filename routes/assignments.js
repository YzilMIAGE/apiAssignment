let Assignment = require("../model/assignment");

const ENUM_RENDU = {
  RENDU: 1,
  NON_RENDU: 2,
};

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  let aQueryFilterParams = {};
  const aNameSearch = req.query.search;
  const aRendu = req.query.rendu;

  if (aNameSearch) {
    aQueryFilterParams = { nom: { $regex: aNameSearch, $options: "i" } };
  }

  if (aRendu == ENUM_RENDU.RENDU) {
    aQueryFilterParams = { ...aQueryFilterParams, rendu: true };
  } else if (aRendu == ENUM_RENDU.NON_RENDU) {
    aQueryFilterParams = { ...aQueryFilterParams, rendu: false };
  }

  const aQueryParams = [
    {
      $match: {
        ...aQueryFilterParams,
      },
    },
  ];

  const aggregateQuery = Assignment.aggregate(aQueryParams);
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20,
    },
    (err, assignments) => {
      if (err) {
        return res.send(err);
      }
      return res.send(assignments);
    }
  );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;

  Assignment.findById(assignmentId, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json(assignment);
  });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.subjectId = req.body.subjectId;
  assignment.auteur = req.body.auteur;
  assignment.note = req.body.note;
  assignment.remarques = req.body.remarques;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = new Date(req.body.dateDeRendu);
  assignment.rendu = req.body.rendu;

  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: `${assignment.nom} updated` });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
};
