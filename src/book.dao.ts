import { BookSchema } from "./book.db.schema";
import { Book } from "./book";

export interface BookDao {
    create(someBook: Book): Book;
    read(id: number): Book | undefined | null;
    update(existingBook: Book): Book | undefined | null;
    search(searchKeywords: Array<number|string>): Book[] | undefined | null;
    findAll(): Book[];
}
