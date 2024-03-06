const express = require("express");
const router = express.Router();

/** @type {Array<{text:string,user:string,added:Date}>} */
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", posts: messages });
});

router.get("/new", (req, res, next) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", (req, res, next) => {
  /** @type {string} */
  let user = (req.body.user ? req.body.user : "").trim();
  if (user === "") {
    user = "Anonymous";
  }

  /** @type {string} */
  const messageText = (req.body.messageText ? req.body.messageText : "").trim();
  if (messageText === "") {
    res.render("form", {
      title: "New Message",
      user: user,
      error: "Message must not be empty",
    });
  } else {
    messages.push({
      text: messageText,
      user: user,
      added: new Date(),
    });

    res.redirect("/");
  }
});

module.exports = router;
