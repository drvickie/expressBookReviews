const axios = require("axios");

// Async/await
async function getBooks() {
  const res = await axios.get("http://localhost:3000/books");
  console.log(res.data);
}

// Promises
function getByISBN() {
  axios.get("http://localhost:3000/books/isbn/9780001")
    .then(res => console.log(res.data));
}

getBooks();
getByISBN();