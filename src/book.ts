export interface Book {
    getId(): number;

    getTitle(): string;
    setTitle(title: string): void;

    getAuthor(): string;
    setAuthor(author: string): void;

    getDescription(): string;
    setDescription(description: string): void;
}
