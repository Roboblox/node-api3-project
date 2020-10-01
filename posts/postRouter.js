const express = require("express");
const Postdb = require("../posts/postDb");
const middleware = require("../middleware/Middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Postdb.get(req)
    .then((allPosts) => {
      res.status(200).json({ allPosts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", middleware.validatePost, (req, res) => {
  const id = req.params.id;

  Postdb.getById(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", middleware.validatePost, (req, res) => {
  const id = req.params.id;

  Postdb.remove(id)
    .then((posts) => {
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
  middleware.validatePost,
  (req, res) => {
    const body = req.body;
    const userId = req.params.id;
    const postId = req.body.id;

    Postdb.update(userId, body)
      .then((post) => {
        res.status(200).json({ body });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  }
);

module.exports = router;
