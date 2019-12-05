const express = require("express"),
  router = express.Router(),
  fetch = require("node-fetch");

const TestModel = require("../models/testModel");

router.get("/", async (req, res, next) => {
  const allTests = await TestModel.getAll();
  console.log("alltests", allTests);
  res.json(allTests).status(200);
});

// router.get("/", async (req, res, next) => {
//   const response = await fetch(`https://api.chucknorris.io/jokes/random`);
//   // console.log(response);
//   const data = await response.json();
//   // console.log(data);
//   res.send(data).status(200);
// });

// router.get(/:test_id, async (req, res, next) => {
//   const {test_id} = req.params;
// })

module.exports = router;
