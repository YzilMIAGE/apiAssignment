const Subject = require("../model/subject");
const Assignment = require("../model/assignment");

const getSubjectHandler = async (req, res) => {
  const aSubject = await Subject.findById(req.params.id);
  if (!aSubject) {
    return res.status(404).send();
  }

  return res.json(aSubject);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getSubjectsHandler = async (req, res) => {
  const aSubjects = await Subject.find();
  // const aAssingments = await Assignment.find();

  // aAssingments.forEach(async (aAssignment) => {
  //   if (aAssignment.rendu) {
  //     aAssignment.note = getRandomInt(20);
  //   } else {
  //     aAssignment.note = 0;
  //     aAssignment.remarques = "";
  //   }
  //   await aAssignment.save();
  // });
  return res.json(aSubjects);
};

module.exports = {
  getSubjectHandler,
  getSubjectsHandler,
};
