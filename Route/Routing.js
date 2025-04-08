const express = require("express");
const { registerUser, loginUser, verifyToken } = require("../Controller/Register");
const router = express.Router();
const {createBlog,getAllBlogs,getBlogById,updateBlog, deleteBlog} = require('../Controller/BlogController');

// The register route is now available at "/register"
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify", verifyToken);

router.post('/createBlog', createBlog);

router.get('/getAllBlogs', getAllBlogs);

router.get('/getBlogById/:id',getBlogById);

router.put('/updateBlog/:id', updateBlog);

router.delete('/deleteBlog/:id', deleteBlog);


module.exports = router;
