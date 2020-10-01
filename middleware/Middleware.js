//custom middleware
// const Postdb = require("../posts/postDb");
const Userdb = require("../users/userDb");

module.exports = {
  //   logger,
  validateUserId,
  validateUser,
  validatePost,
  //   validatePostId,
};

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Userdb.getById(id)
    .then((user) => {
      if (user) {
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;

  if (Object.entries(body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!body.name) {
    res.status(401).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;

  if (Object.entries(body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!body.text) {
    res
      .status(400)
      .json({ body: body, message: "missing required text field" });
  }
  next();
}
