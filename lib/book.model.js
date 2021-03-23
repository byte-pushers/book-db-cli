"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var BookModel = /** @class */ (function () {
    function BookModel(bookConfig) {
        this._id = (bookConfig !== null && bookConfig !== undefined) ? bookConfig.id : undefined;
        this._title = (bookConfig !== null && bookConfig !== undefined) ? bookConfig.title : undefined;
        this._author = (bookConfig !== null && bookConfig !== undefined) ? bookConfig.author : undefined;
        this._description = (bookConfig !== null && bookConfig !== undefined) ? bookConfig.description : undefined;
    }
    Object.defineProperty(BookModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    BookModel.prototype.getId = function () {
        return this._id;
    };
    BookModel.prototype.setId = function (id) {
        this._id = id;
    };
    Object.defineProperty(BookModel.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
        },
        enumerable: false,
        configurable: true
    });
    BookModel.prototype.setTitle = function (title) {
        this._title = title;
    };
    BookModel.prototype.getTitle = function () {
        return this._title;
    };
    Object.defineProperty(BookModel.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (author) {
            this._author = author;
        },
        enumerable: false,
        configurable: true
    });
    BookModel.prototype.getAuthor = function () {
        return this._author;
    };
    BookModel.prototype.setAuthor = function (author) {
        this._author = author;
    };
    Object.defineProperty(BookModel.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this._description = description;
        },
        enumerable: false,
        configurable: true
    });
    BookModel.prototype.getDescription = function () {
        return this._description;
    };
    BookModel.prototype.setDescription = function (description) {
        this._description = description;
    };
    BookModel.DEFAULT_CONFIG = {
        id: null,
        title: null,
        author: null,
        description: null
    };
    return BookModel;
}());
exports.BookModel = BookModel;
