var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotection').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require("../middleware/postsmiddleware");
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts ,function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Darien Banuelos" });
});

router.get('/login', (req,res,next) => {
  res.render('login');
});

router.get('/register', (req,res,next) => {
  res.render('registration');
});

router.get('/view', (req,res,next) => {
  res.render('viewpost');
});

router.use('/post', isLoggedIn);
router.get('/post', (req,res,next) => {
  res.render('postimage');
});

router.get('/view/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
  res.render('viewpost', {title: `Post ${req.params.id}`});
});

module.exports = router;
