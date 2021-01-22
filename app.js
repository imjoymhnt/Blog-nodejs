const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est quia nostrum, quae ipsam error quibusdam veniam rem, fuga eligendi, dolor eveniet? Praesentium, rem, debitis recusandae consectetur ipsa illo pariatur ipsam quaerat repellat assumenda dolor laudantium distinctio iste quae excepturi, aut veniam dolorum mollitia eveniet sunt inventore at deleniti! Deserunt.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est quia nostrum, quae ipsam error quibusdam veniam rem, fuga eligendi, dolor eveniet? Praesentium, rem, debitis recusandae consectetur ipsa illo pariatur ipsam quaerat repellat assumenda dolor laudantium distinctio iste quae excepturi, aut veniam dolorum mollitia eveniet sunt inventore at deleniti! Deserunt?";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est quia nostrum, quae ipsam error quibusdam veniam rem, fuga eligendi, dolor eveniet? Praesentium, rem, debitis recusandae consectetur ipsa illo pariatur ipsam quaerat repellat assumenda dolor laudantium distinctio iste quae excepturi, aut veniam dolorum mollitia eveniet sunt inventore at deleniti! Deserunt?";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi est quia nostrum, quae ipsam error quibusdam veniam rem, fuga eligendi, dolor eveniet? Praesentium, rem, debitis recusandae consectetur ipsa illo pariatur ipsam quaerat repellat assumenda dolor laudantium distinctio iste quae excepturi, aut veniam dolorum mollitia eveniet sunt inventore at deleniti! Deserunt?";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {
  Blog.find((err, blogs) => {
    if (!err) {
      res.render("home", { homeStartingContent, blogs });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:id", (req, res) => {
  Blog.findOne({ _id: req.params.id }, (err, blog) => {
    if (!err) {
      res.render("post", { blog });
    }
  });
});

app.post("/compose", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const post = new Blog({
    title,
    body,
  });
  post.save();
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
