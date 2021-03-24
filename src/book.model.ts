import { Book } from "./book";

export class BookModel implements Book {
    private author = "";
    private description: string = "";
    private readonly id: number = -1;
    private title: string = "";

    constructor(title: string, author: string, description: string, id?: number) {
        if (id !== null && id !== undefined && !isNaN(id)) this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
    }

    getAuthor(): string {
        return this.author;
    }

    getDescription(): string {
        return this.description;
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    setAuthor(author: string): void {
        this.author = author;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setTitle(title: string): void {
        this.title = title;
    }
}
