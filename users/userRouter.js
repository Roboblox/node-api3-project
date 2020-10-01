const express = require("express");
const Userdb = require("../users/userDb");
const Postdb = require("../posts/postDb");
const middleware = require("../middleware/Middleware");

const router = express.Router();

router.post("/", middleware.validateUser, (req, res) => {
  const body = req.body;

  Userdb.insert(body)
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.post(
  "/:id/posts",
  middleware.validateUserId,
  middleware.validatePost,
  (req, res) => {
    const body = req.body;

    Postdb.insert(body)
      .then((post) => {
        res.status(201).json({ post });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  }
);

router.get("/", (req, res) => {
  Userdb.get(req.query)
    .then((allUsers) => {
      res.status(200).json({ allUsers });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", middleware.validateUserId, (req, res) => {
  const id = req.params.id;

  Userdb.getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id/posts", middleware.validateUserId, (req, res) => {
  const id = req.params.id;

  Userdb.getUserPosts(id)
    .then((userPost) => {
      res.status(200).json(userPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", middleware.validateUserId, (req, res) => {
  const id = req.params.id;

  Userdb.remove(id)
    .then((user) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  (req, res) => {
    const body = req.body;
    const id = req.params.id;

    Userdb.update(id, body)
      .then((user) => {
        res.status(200).json({ body });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  }
);

module.exports = router;
