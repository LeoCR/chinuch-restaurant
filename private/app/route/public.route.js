import nodemailer from "nodemailer";
import { google } from "googleapis";

require("dotenv").config();
module.exports = function (app, express, path, isLoggedIn) {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "restaurantnodejscr@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const publicController = require(path.resolve(
    __dirname + "/../db/controller/public.controller.js"
  ));

  app.post("/submit/contact-form", function (req, res) {
    if (
      (req.body.fullName !== "") & (req.body.phoneNumber !== "") &&
      req.body.email !== "" &&
      req.body.comment !== ""
    ) {
      var message = "<h4>Full Name:</h4><p>" + req.body.fullName + "</p>";
      message += "<h4>Telephone:</h4><p>" + req.body.phoneNumber + "</p>";
      message += "<h4>Email:</h4><p>" + req.body.email + "</p>";
      message += "<h4>Comment:</h4><p>" + req.body.comment + "</p>";
      var mailOptions = {
        from: "restaurantnodejscr@gmail.com",
        to: "laranibarsanchez@gmail.com",
        subject: "Restaurant Contact Form",
        html: message,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.send(req.body);
        }
      });
    } else {
      res.send({ contact: null });
    }
  });
  app.use(
    ["/paypal/payment/", "/paypal/payment/js/"],
    express.static(__dirname + "/../../../../chinuch-restaurant/build")
  );
  app.use(
    ["/paypal/payment/js", "/checkout/js"],
    express.static(__dirname + "/../../../../chinuch-restaurant/public/js")
  );
  app.get("/api/dish/ingredients/:id", publicController.findIngredients);
  app.use(
    "/img",
    express.static(__dirname + "/../../../../chinuch-restaurant/public/images")
  );
  app.use(
    "/img/uploads",
    express.static(
      __dirname + "/../../../../chinuch-restaurant/public/images/uploads"
    )
  );
};
