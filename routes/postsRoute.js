const router = require("express").Router();
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const { createPostCtrl, getAllPostsCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, } = require("../controllers/postsController");
const validateObjectID = require("../middlewares/validateObjectID");

// /api/posts/count
router.route("/count")
.get(getPostCountCtrl)
.delete(validateObjectID, verifyToken, deletePostCtrl)
.put(validateObjectID, verifyToken, updatePostCtrl);

// /api/posts/update-image/:id
router.route("/update-image/:id")
    .put(validateObjectID, verifyToken, photoUpload.single("image"), updatePostImageCtrl);

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);


module.exports = router;
