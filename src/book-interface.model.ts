export interface BookInterfaceModel {
    id: number,
    title: string,
    author: string,
    description: string

    getId(): number;
    setId(id: number): void;

    getTitle(): string;
    setTitle(title: string): void;

    getAuthor(): string;
    setAuthor(author: string): void;

    getDescription(): string;
    setDescription(description: string): void;
}
