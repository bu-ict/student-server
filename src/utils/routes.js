// import crmRoutes from "./src/routes/crmRoutes";
const {userRoutes} =  require("../routes/userRoutes");
// const {customerRoutes} =  require("../routes/customerRoutes");
// const {accountRoutes} =  require("../routes/accountRoutes");


// import verifyRoutes from "./src/routes/verifyRoutes";

const routes = (app) => {
  // crmRoutes(app);
  userRoutes(app);
  // customerRoutes(app);
  // accountRoutes(app);
  // verifyRoutes(app);
};


module.exports = {routes};
