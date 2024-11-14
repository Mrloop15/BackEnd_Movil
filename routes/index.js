var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.render("index", { title: "Express" });
  res.send("soy método get");
});

router.post("/", function (req, res) {
  res.send("soy el metodo post");
});
router.put("/", function (req, res) {
  res.send("soy el método put");
});
router.delete("/", function (req, res) {
  res.send("soy el método delete");
});

module.exports = router;
