import { Book } from "./book";
export declare class BookModel implements Book {
    _id: number;
    _title: string;
    _author: string;
    _description: string;
    static readonly DEFAULT_CONFIG: any;
    constructor(bookConfig: any);
    get id(): number;
    set id(id: number);
    getId(): number;
    setId(id: number): void;
    get title(): string;
    set title(title: string);
    setTitle(title: string): void;
    getTitle(): string;
    get author(): string;
    set author(author: string);
    getAuthor(): string;
    setAuthor(author: string): void;
    get description(): string;
    set description(description: string);
    getDescription(): string;
    setDescription(description: string): void;
}
