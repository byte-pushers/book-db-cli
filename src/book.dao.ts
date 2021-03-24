import { BookSchema } from "./book.db.schema";
import { Book } from "./book";

export interface BookDao {
    create(bookModel: Book): Book;
    update(bookModel: Book): Book;
    getBooks(): BookSchema[];
}
