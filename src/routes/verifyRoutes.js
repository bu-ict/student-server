import { sendverify, verify } from "../controllers/verifyController";

const verifyRoutes = (app) => {
  //   app.route("/emailverify/send").get(sendverify);
  app.route("/emailverify/send/:email").get(sendverify);
  app.route("/emailverify/verify").get(verify);
};

export default verifyRoutes;
