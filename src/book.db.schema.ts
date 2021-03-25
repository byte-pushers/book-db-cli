export interface BookSchema {
    author: string;
    description: string;
    id: number;
    title: string;
}

export interface BookDbSchema {
    books: BookSchema[];
    bookIdSequence: number;
}
