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

    public findAll(): Book[] {
        return (this.db) ? this.db.get('books').value().map(bookSchema => new BookModel(bookSchema.title, bookSchema.author, bookSchema.description, bookSchema.id)) : [];
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

    public read(id: number): Book | undefined | null {
        const existingBookResult = this.db.get('books').find({id: id});
        const existingBookSchema = existingBookResult.value();
        let updatedBook: Book | undefined | null;

        if (this.isDefinedAndNotNull(existingBookSchema)) {
            updatedBook = new BookModel(existingBookSchema.title, existingBookSchema.author, existingBookSchema.description, existingBookSchema.id);
        }

        return updatedBook;
    }

    public update(someBook: Book): Book | undefined | null {
        const someBookId = someBook.getId();
        const updatedAuthor = someBook.getAuthor();
        const updatedDescription = someBook.getDescription();
        const updatedTitle = someBook.getTitle();

        const existingBookResult = this.db.get('books').find({id: someBookId});
        const existingBookSchema = existingBookResult.value();
        let updatedBook: Book | undefined | null;

        if (this.isDefinedAndNotNull(existingBookSchema)) {
            if (this.isDefinedAndNotNull(updatedAuthor)) existingBookResult.assign({author: updatedAuthor}).write();
            if (this.isDefinedAndNotNull(updatedDescription)) existingBookResult.assign({description: updatedDescription}).write();
            if (this.isDefinedAndNotNull(updatedTitle)) existingBookResult.assign({title: updatedTitle}).write();
            updatedBook = new BookModel(existingBookSchema.title, existingBookSchema.author, existingBookSchema.description, existingBookSchema.id);
        }

        return updatedBook;
    }

    public search(searchKeywords: Array<number|string>): Book[] | undefined | null {
        const bookSchemaResults = this.db.get('books').value().filter(book => {
            let foundPossibleMatch = searchKeywords.some((searchKeyword:any) => {
                let foundPotentialMatch = false;

                if (book.id.toString() === searchKeyword) {
                    foundPotentialMatch = true;
                } else if (book.author === searchKeyword ||
                    (this.isDefinedAndNotNull(book.author) && book.author.includes(searchKeyword))) {
                    foundPotentialMatch = true;
                } else if (book.description === searchKeyword ||
                    (this.isDefinedAndNotNull(book.description) && book.description.includes(searchKeyword))) {
                    foundPotentialMatch = true;
                } else if (book.title === searchKeyword ||
                    (this.isDefinedAndNotNull(book.title) && book.title.includes(searchKeyword))) {
                    foundPotentialMatch = true;
                }

                return foundPotentialMatch;
            });


            return foundPossibleMatch;
        });

        const books: Book[] = bookSchemaResults.map((bookSchema): Book => {
            return new BookModel(bookSchema.title, bookSchema.author, bookSchema.description, bookSchema.id);
        });

        return books;
    }

    private incrementId(): number {
        let idSequence: number = this.db.get('book-id-sequence').value();
        this.db.update('book-id-sequence', n => n + 1).write();
        return ++idSequence;
    }

    private isDefinedAndNotNull(someObject: any) {
        return (someObject !== null && someObject !== undefined);
    }
}
