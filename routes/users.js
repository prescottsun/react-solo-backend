const express = require("express"),
  bcrypt = require("bcryptjs"),
  router = express.Router();

const UserModel = require("../models/userModel");

router.get("/login", async (req, res, next) => {
  // res.render("template", {
  //     locals: {
  //         title: "Login",
  //         isLoggedIn: req.session.is_logged_in
  //     },
  //     partials: {
  //         partial: "partial-login"
  //     }
  // });
});

router.get("/signup", async (req, res, next) => {
  // res.render("template", {
  //     locals: {
  //         title: "Sign Up",
  //         isLoggedIn: req.session.is_logged_in
  //     },
  //     partials: {
  //         partial: "partial-signup"
  //     }
  // });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).redirect("/users/login");
});

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = new UserModel(null, firstName, lastName, email, hash);
  const newUser = await user.save();
  console.log("Was user added?", newUser.id);
  if (newUser) {
    res.status(200);
    // .redirect("/users/login");
  } else {
    res.status(500);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = new UserModel(null, null, null, email, password);
  const response = await user.login();
  if (!!response.isValid) {
    const { user_id, first_name, last_name } = response;
    console.log("response from login is, ", response);

    req.session.is_logged_in = true;
    req.session.first_name = first_name;
    req.session.last_name = last_name;
    req.session.user_id = user_id;
    console.log("isloggedin post", req.session.is_logged_in);
    res.status(200);
    // .redirect("/login/success");
  } else {
    res.sendStatus(401);
  }
});

router.get("/login/success", async (req, res, next) => {
  console.log("isloggedin get", req.session.is_logged_in);
  const data = {
    isLoggedIn: req.session.is_logged_in,
    firstName: req.session.first_name,
    lastName: req.session.last_name
    // email: req.session.email
  };
  console.log("data is", data);
  res.send(data).status(200);
});

module.exports = router;
