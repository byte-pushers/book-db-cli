import {Book} from "./book";

export class BookModel implements Book {

    public _id: number;
    public _title: string;
    public _author: string;
    public _description: string;

    static readonly DEFAULT_CONFIG: any = {
        id: null,
        title: null,
        author: null,
        description: null
    };
    constructor(bookConfig: any) {
        this._id =  (bookConfig !== null && bookConfig !== undefined) ? bookConfig.id : undefined;
        this._title =  (bookConfig !== null && bookConfig !== undefined) ? bookConfig.title : undefined;
        this._author = (bookConfig !== null && bookConfig !== undefined) ? bookConfig.author: undefined;
        this._description = (bookConfig !== null && bookConfig !== undefined) ? bookConfig.description: undefined;
    }

    get id() {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    getId(): number {
        return this._id;
    }

    setId(id: number): void {
        this._id = id;
    }

    get title() {
        return this._title;
    }
    set title(title: string) {
        this._title = title;
    }

    setTitle(title: string): void {
        this._title = title;
    }

    getTitle(): string {
        return this._title;
    }

    get author() {
        return this._author;
    }
    set author(author: string) {
        this._author = author;
    }

    getAuthor(): string {
        return this._author;
    }
    setAuthor(author: string): void {
        this._author = author;
    }

    get description() {
        return this._description;
    }
    set description(description: string) {
        this._description = description;
    }

    getDescription(): string {
        return this._description;
    }
    setDescription(description: string): void {
        this._description = description;
    }
}
