import lowdb from "lowdb";
import { default as FileSync } from "lowdb/adapters/FileSync";
import { BookDao } from "./book.dao";
import { BookDbSchema, BookSchema } from "./book.db.schema";
import { BookModel } from "./book.model";
import {Book} from "./book";

export class BookLowDbDao implements BookDao {
    private readonly adapter = new FileSync<BookDbSchema>("db.json");
    private readonly db = lowdb(this.adapter);
    private static count: number = 6;
    constructor() {

    }

    public getBooks(): BookSchema[] {
        return (this.db) ? this.db.get('books').value() : [];
    }

    public create(someBook: Book): Book {
        const newBook:BookSchema = {
            id: this.incrementId(),
            author: someBook.getAuthor(),
            description: someBook.getDescription(),
            title: someBook.getTitle()
        };

        this.db.get('books').push(newBook).write();

        return new BookModel(newBook.title, newBook.author, newBook.description, newBook.id);
    }

    public update(someBook: Book): Book {
        const someBookId = someBook.getId();
        const updatedAuthor = someBook.getAuthor();
        const updatedDescription = someBook.getDescription();
        const updatedTitle = someBook.getTitle();
        const existingBookResult = this.db.get('books').find({id: someBookId});
        const existingBook = existingBookResult.value();

        if (this.isDefinedAndNotNull(updatedAuthor)) existingBookResult.assign({author: updatedAuthor}).write();
        if (this.isDefinedAndNotNull(updatedDescription)) existingBookResult.assign({description: updatedDescription}).write();
        if (this.isDefinedAndNotNull(updatedTitle)) existingBookResult.assign({title: updatedTitle}).write();

        return new BookModel(existingBook.title, existingBook.author, existingBook.description, existingBook.id);
    }

    private incrementId(): number {
        let idSequence: number = this.db.get('book-id-sequence').value();
        this.db.update('book-id-sequence', n => n + 1).write();
        return ++idSequence;
    }

    private isDefinedAndNotNull(someObject: string) {
        return (someObject !== null && someObject !== undefined);
    }
}
