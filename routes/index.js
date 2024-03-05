const express = require("express");
const router = express.Router();

/** @type {Array<{text:string,user:string,added:Date}>} */
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
]

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Messages", posts: messages });
});

router.get("/new", (req, res, next) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", (req, res, next) =>{
  res.redirect("/")
})

module.exports = router;
