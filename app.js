const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const blogPosts = [
  { id: 1, title: "Learning JavaScript" },
  { id: 2, title: "Learning Mern Stack" },
];

let isAuthenticated = false;

app.get("/", (req, res) => {
  res.render("../views/pages/home", { blogPosts, isAuthenticated });
});

app.get("/pages/:id", (req, res) => {
  const postId = req.params.id;
  const post = blogPosts.find((post) => post.id == postId);

  if (post) {
    res.render(`pages/post${post.id}`, { post, isAuthenticated });
  } else {
    res.status(404).render("pages/404");
  }
});

app.get("/login", (req, res) => {
  res.render("../views/pages/login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == "tan" && password === "123456") {
    isAuthenticated = true;
    res.redirect("/");
  } else {
    res.render("/pages/failure");
  }
});

app.get("/logout", (req, res) => {
  isAuthenticated = false;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
