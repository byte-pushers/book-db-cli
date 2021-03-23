import {BookModel} from "./book.model";

export class bookDatabase {
    public books: BookModel [] = [];

    constructor() {
        this.generateCurrentBooks();
    }

    public createBook() {
        const newBook = {
            id: null,
            title: null,
            author: null,
            description: null
        }
        return newBook;
    }

    public retrieveBook(selectedBookId: number): BookModel {
        let selectedBook: BookModel = new BookModel(null);

        this.books.forEach((book) => {
            if (book.id === selectedBookId) {
                selectedBook = book;
            }
        });

        return selectedBook;
    }

    private generateCurrentBooks() {
        // TODO Populate Books here
        // TODO create an array which will contain all the books as objects
    }
}
