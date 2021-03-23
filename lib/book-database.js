"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookDatabase = void 0;
var book_model_1 = require("./book.model");
var bookDatabase = /** @class */ (function () {
    function bookDatabase() {
        this.books = [];
        this.generateCurrentBooks();
    }
    bookDatabase.prototype.createBook = function () {
        var newBook = {
            id: null,
            title: null,
            author: null,
            description: null
        };
        return newBook;
    };
    bookDatabase.prototype.retrieveBook = function (selectedBookId) {
        var selectedBook = new book_model_1.BookModel(null);
        this.books.forEach(function (book) {
            if (book.id === selectedBookId) {
                selectedBook = book;
            }
        });
        return selectedBook;
    };
    bookDatabase.prototype.generateCurrentBooks = function () {
        // TODO Populate Books here
        // TODO create an array which will contain all the books as objects
    };
    return bookDatabase;
}());
exports.bookDatabase = bookDatabase;
