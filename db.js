const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://OOG:hello@cluster0.uj6bl9k.mongodb.net/?retryWrites=true&w=majority";



const dbName = 'books'
let db
const init = () =>
  MongoClient.connect(uri,  { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })
  const insertBook = (book) => {
    const collection = db.collection('books')
    book.isbn = parseInt(book.isbn)
    book.numOfPages = parseInt(book.numOfPages)
    return collection.insertOne(book)
  }

  const getBooks = () => {
    const collection = db.collection('books')
    return collection.find({}).toArray()
  }

  const insertBooks = (dataNom) => {
    const collection = db.collection('books')
    return collection.insertMany(dataNom)
  }

  const deleteBook = (isbn) => {
    const collection = db.collection('books')
    return collection.deleteOne({ isbn:(parseInt(isbn)) })
  }

  const updateBook = (isbn, newBookData) => {
    const collection = db.collection('books')
    return collection.replaceOne({ isbn:(parseInt(isbn))}, newBookData)
  }

  module.exports = { init,insertBook,insertBooks,deleteBook,updateBook,getBooks}