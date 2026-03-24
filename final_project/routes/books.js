const express = require("express");
const books = require("../data/booksdb");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  res.json(books);
});

// GET by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  res.json(book || { message: "Not found" });
});

// GET by Author
router.get("/author/:author", (req, res) => {
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === req.params.author.toLowerCase()
  );
  res.json(result);
});

// GET by Title
router.get("/title/:title", (req, res) => {
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === req.params.title.toLowerCase()
  );
  res.json(result);
});

// Add / Modify Review
router.put("/review/:isbn", auth, (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;
  const username = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews[username] = review;

  res.json({ message: "Review added/updated" });
});

// Delete Review
router.delete("/review/:isbn", auth, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.json({ message: "Review deleted" });
  }

  res.status(404).json({ message: "Review not found" });
});

module.exports = router;