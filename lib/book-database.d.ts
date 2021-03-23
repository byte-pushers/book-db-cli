import { BookModel } from "./book.model";
export declare class bookDatabase {
    books: BookModel[];
    constructor();
    createBook(): {
        id: null;
        title: null;
        author: null;
        description: null;
    };
    retrieveBook(selectedBookId: number): BookModel;
    private generateCurrentBooks;
}
