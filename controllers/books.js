const Book = require('../models/book');

module.exports = { 
  searchAPI,
  addToLibrary,
  getLibrary,
  deleteBook,
  show
}

async function searchAPI(req, res) {
  const results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=25&key=${process.env.API_KEY}`, { method: 'GET' })
  const books = await results.json()
  res.render('books/results', { books:books.items })
}

async function addToLibrary(req, res) {
  // looking to see if book exists in my database
  const book = await Book.exists({ googleId: req.body.googleId })
  // if it does exist already in database
  if (book) {
  // look for that book with googleId
    const b = await Book.findOne({googleId: req.body.googleId})
    // variable included will be true of false
    // wether or not the user exists in the addedBy array
    let included = b.addedBy.includes(req.user._id)
    // if the user was already included in the library, return
    if (included) return res.redirect('/')
    //if not included push user into addedBy array
    b.addedBy.push(req.user._id)
    await b.save()
  } else {
    // if not in database create new book 
    const newBook = await Book.create(req.body);
    // add user to addedbY array
    newBook.addedBy.push(req.user._id)
    await newBook.save();
  }
  res.redirect('/books/library')
}

async function getLibrary(req, res) {
  // Make the query object to use with Book.find based upon
 // all the books the user is in the addedBy array
  const books = await Book.find({addedBy: req.user._id});
  res.render('books/library', {
    books,
  });
}

async function deleteBook(req, res) {
  try {
    // Find the book by its ID
    const book = await Book.findById(req.params.id);
    // Check if the book exists
    if (!book) {
      return res.status(404).send('Book not found');
    }
    // Check if the logged-in user has added the book to their library
    const userAddedBook = book.addedBy.includes(req.user._id);
    // If the user has added the book, proceed with deletion
    if (userAddedBook) {
      book.addedBy.remove(req.user._id);
      await book.save();
      return res.redirect('/books/library');
    } 
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
}

async function show(req, res) {
  const book = await Book.findById(req.params.id);
  res.render('books/show', { book , title: book.name });
}