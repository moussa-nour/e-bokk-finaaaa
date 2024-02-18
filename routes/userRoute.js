const express = require('express')
const { getAllUserCtrl, getUserProfileCtrl, updateUserProfileCtrl,getUserCounterCtrl, profilePhotoUpLoadCtrl, deleteUserProfileCtrl} = require('../controllers/usersController')
const { verifyToken ,verifyTokenAndOnlyUser,verifyTokenAndAuthorization,} = require('../middlewares/verifyToken')
const router = express.Router()
const validateObjectID = require("../middlewares/validateObjectID");
const photoUpload = require('../middlewares/photoUpload');
const { toggleLikeCtrl } = require('../controllers/postsController');

//api/user/profile
router.route("./profile").get(verifyToken,getAllUserCtrl)

//api/user/profile/:id
router
.route("./profile/:id")
.get(validateObjectID,getUserProfileCtrl)
.put(validateObjectID,verifyTokenAndOnlyUser,updateUserProfileCtrl )
.delete(validateObjectID, verifyTokenAndAuthorization,deleteUserProfileCtrl);

//api/user/profile/profile photo
router.route("./profile/profile-photo-upload")
.post(verifyToken, photoUpload.single("image") ,profilePhotoUpLoadCtrl)

//api/user/count
router.route("/count").get(verifyToken,getUserCounterCtrl);

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectID, verifyToken, toggleLikeCtrl);

module.exports = router
