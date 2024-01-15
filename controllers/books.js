const Book = require('../models/book');

module.exports = { 
  searchAPI,
  addToLibrary
}

async function searchAPI(req, res) {
  const results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=25&key=${process.env.API_KEY}`, { method: 'GET' })
  const books = await results.json()
  const book = books.items[0].volumeInfo
  res.render('books/results', { book })
}

async function addToLibrary(req, res) {
  console.log(req.body)
}

