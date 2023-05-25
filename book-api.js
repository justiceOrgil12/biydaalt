const express = require('express')
const Joi = require('joi')
const fs = require('fs')

const {insertBook,insertBooks,deleteBook, updateBook, getBooks} = 
require('./db')


const router = express.Router()

const bookSchema = Joi.object().keys({
    isbn: Joi.number().integer(),
    title: Joi.string(),
    author: Joi.string(),
    publish_date: Joi.date().iso(),
    publisher: Joi.string(),
    numOfPages: Joi.number().integer()
})

router.post('/book', (req, res) => {
    const book = req.body;
    const result = bookSchema.validate(book)
    if(result.error) {
        console.log(result.error)
        res.status(400).end()
        return
    }
    insertBook(book)
    .then(() => {
        res.send('Book is added to the database')
        res.status(200).end()
    })
    .catch((err) => {
        console.log(err)
        res.status(500).end()
    })

});

router.post('/books',(req, res)=> {

const booksFile = JSON.parse(fs.readFileSync('./dataNom.json', 'utf-8'))
const booksStr = JSON.stringify(booksFile);
const books = JSON.parse(booksStr)
insertBooks(books)
    .then(() => {
        res.send('Book is added to the database');
        res.status(200).end()
    })
})

router.delete('/book/:isbn',(req, res)=> {
    const isbn = req.params.isbn;

deleteBook(isbn).then((result) => {
    console.log(result)
    res.send('Book is deleted');
    res.status(200).end()

})
})

router.post('/book/:isbn',(req, res)=> {
    const isbn = req.params.isbn;
    const newBookData = req.body;
    console.log(isbn)
    updateBook(isbn, newBookData)
    .then((result) =>   {
        console.log(result)
        res.status(200).end()
    })
})

router.get('/books', (req, res) =>{
    getBooks()
    .then((books) => {
        res.json(books)
        res.status(200).end()
    })
})

module.exports = router

