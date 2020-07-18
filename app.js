//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _ = require('lodash');

const homeStartingContent = "Hi! This web application is currently in its beta stage and uses MongoDB on backend. This application has a hidden page through which you can compose multiple posts which will be displayed on the home page. To access the compose page, you will be required to type '/compose' after the URL. Feel free to use the application. ";
const aboutContent = "Hi! My name is Anirudh Singh and I am currently a student of Bits Pilani, Hyderabad campus. I am an aspiring web and app developer. You can check out my work on my git, on the following link\:\
'https://github.com/legendsovermyths'";
const contactContent = "You can contact my following social media accounts\:gmail\:\ anirudh.anirudhsingh.singh@gmail.com instagram\:\ https\:\www.instagram.com\/\anibitte facebook\:\ https:www.facebook.com\/\anirudh.anirudhsingh.singh"

const app = express();
mongoose.connect('mongodb+srv://Admin:test123@cluster0.jio15.mongodb.net/postDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.set('view engine', 'ejs');
const postsSchema = {
  title: String,
  content: String
}
const Post = mongoose.model("post", postsSchema)
var posts = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  Post.find({}, function(err, post) {
    res.render("home", {
      text1: homeStartingContent,
      posts: post
    })
  })

})
app.get("/post/:topic", function(req, res) {
      idOfPost = req.params.topic
      Post.findOne({
          _id: idOfPost
        }, function(err, foundPost) {
          res.render("post", {
              postTitle: foundPost.title,
              postContent: foundPost.content});
          })
      })
      app.get("/about", function(req, res) {
      res.render("about", {
        text2: aboutContent
      })
    })
    app.get("/contact", function(req, res) {
      res.render("contact", )
    })
    app.get("/compose", function(req, res) {
      res.render("compose")
    })
    app.post("/compose", function(req, res) {
      const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent,
      })
      post.save()
      console.log(req.body)
      res.redirect("/")
    })
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

    app.listen(port, function() {
      console.log("Server started on port 3000");
    });
