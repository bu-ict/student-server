const {
  register,
  logIn,
  getCurrentSemester,
  LogInRequired,
  getAllSemsters,
  getResults,
  isUserExist,
  isUserExist2,
  isStudentExist,
  changePassword,
  getStudentEmail,
  getStudentPassowrd,
  sendEmail
} = require("../controllers/userController");


const userRoutes = (app) => {
  app.route("/auth/register").post(register);
  app.route("/auth/login").post(logIn);
  app.route("/auth/isStudentExist").post(isStudentExist);
  app.route("/auth/isUserExistRecover").post(isUserExist2);
  app.route("/auth/sendEmail").post(sendEmail);
  app.route("/auth/StudentEmail/:studentId").get(getStudentEmail);
  app.route("/auth/StudentPassword/:studentId").get(getStudentPassowrd);

  app.route("/auth/isUserExist").post(LogInRequired,isUserExist);
  app.route("/auth/changePassword").post(LogInRequired,changePassword);
  app
    .route("/student/current-semester/:studentNumber")
    .get(LogInRequired, getCurrentSemester);
    app.route("/student/all-semesters/:studentNumber")
    .get(LogInRequired, getAllSemsters)
    app.route("/student/results/:depID/:studentNumber/:CurriculumVersion")
    .get(LogInRequired, getResults)

};

// export default userRoutes;
module.exports = {userRoutes};
