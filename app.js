const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

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

const blogs = [];

app.get("/", (req, res) => {
  res.render("home", { homeStartingContent, blogs });
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

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.heading,
    content: req.body.text,
  };
  blogs.push(post);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening to the port 3000");
});
