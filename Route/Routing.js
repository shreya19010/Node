const express = require("express");
const { registerUser, loginUser, verifyToken,getAllUsers, getUserById, updateUserById, deleteUserById,} = require("../Controller/Register");
const router = express.Router();
const {createBlog,getAllBlogs,getBlogById,updateBlog, deleteBlog} = require('../Controller/BlogController');

// login/signup

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify", verifyToken);

router.get("/getAllUsers", getAllUsers);

router.get("/getUserById/:id", getUserById);

router.put("/updateUserById/:id", updateUserById);

router.delete('/deleteUserById/:id', deleteUserById);

//blog

router.post('/createBlog', createBlog);

router.get('/getAllBlogs', getAllBlogs);

router.get('/getBlogById/:id',getBlogById);

router.put('/updateBlog/:id', updateBlog);

router.delete('/deleteBlog/:id', deleteBlog);


module.exports = router;
