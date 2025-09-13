var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "thehorntechnology@gmail.com",
    pass: "horn2020",
  },
});

var rand, mailOptions, host, link;
rand = Math.floor(Math.random() * 100 + 54);
export const sendverify = (req, res) => {
  host = req.get("host");
  link = "http://" + req.get("host") + "/emailverify/verify?id=" + rand;
  mailOptions = {
    to: req.params.email,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>",
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.end("error");
    } else {
      res.end("sent");
    }
  });
};

export const verify = (req, res) => {
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    if (req.query.id == rand) {
      res.end(
        "<div ><h1>Email " +
          mailOptions.to +
          " is been Successfully verified</h1> <br/> <a href='http://localhost:3000/sigin'> click this link to Signin  </a> </div>"
      );
    } else {
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
};
