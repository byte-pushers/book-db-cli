import {BookInterface} from "./book-interface";

export class bookDatabase {
    public books: BookInterface [] = [];

    constructor() {
        generateCurrentBooks();
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

    public retrieveBook(selectedBookId: number): BookInterface {
let selectedBook: BookInterface = null;
this.books.forEach((book) => {
    if (book.id === selectedBookId) {
        selectedBook = book;
    }
        });
return selectedBook
    }

    private generateCurrentBooks() {
// TODO Populate Books here
        // TODO create an array which will contain all the books as objects
    }
}
