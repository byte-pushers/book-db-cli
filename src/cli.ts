#!/usr/bin/env node
import inquirer from "inquirer";
import {BookDao} from "./book.dao";
import {BookLowDbDao} from "./book.lowdb.dao";
import {BookModel} from "./book.model";
import {Book} from "./book";

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

const isDefinedAndNotNull = (someObject: any) => someObject !== null && someObject !== undefined;

clear();
console.log(
    chalk.blue(
        figlet.textSync('book-database', { horizontalLayout: 'full' })
    )
);

const bookDao: BookDao = new BookLowDbDao();
const questions = [
    {
        type: "input",
        name: "title",
        message: "Title:"
    },
    {
        type: "input",
        name: "author",
        message: "Author:"
    },
    {
        type: "input",
        name: "description",
        message: "Description:"
    },
];

program
    .version('0.0.1')
    .description("A database to add or edit books")
    .option('-t, --title <title>', "Title of book.")
    .option('-a, --author <author>', "Author of book.")
    .option('-d, --description <description>', "Description of book.");

program
    .command("view-all")
    .description('View all books.')
    .alias('va')
    .action(() => {
        console.log("==== View Books ====")
        bookDao.findAll().forEach((book)=> console.log("["+book.getId()+"] " + book.getTitle()));
    });

program
    .command("add")
    .description('Add a book.')
    .alias('a')
    .action(() => {
        const options = program.opts(),
            hasOptions = (options !== null && options !== undefined),
            title = (hasOptions) ? options.title : null,
            author = (hasOptions) ? options.author : null,
            description = (hasOptions) ? options.description : null;

        console.log("==== Add Book ====");
        inquirer.prompt(questions).then(answers => {
            const persistedBook = bookDao.create(new BookModel(answers.title, answers.author, answers.description));

            if (isDefinedAndNotNull(persistedBook)) {
                console.log("\nYou've entered the following information:");
                console.log("\n\tTitle: " + persistedBook.getTitle());
                console.log("\tAuthor: " + persistedBook.getAuthor());
                console.log("\tDescription: " + persistedBook.getDescription());
                console.log("\nBook["+persistedBook.getId()+"] saved");
            } else {
                console.log("\nBook not saved");
            }

        });

    });

program
    .command("edit")
    .arguments('<id>')
    .description('Edit a book.', {id: 'book id'})
    .alias('e')
    .action((id:string) => {
        const options = program.opts(),
            hasOptions = (options !== null && options !== undefined),
            title = (hasOptions) ? options.title : null,
            author = (hasOptions) ? options.author : null,
            description = (hasOptions) ? options.description : null;

        const persistedBook = bookDao.update(new BookModel(title, author, description, parseInt(id, 10)));

        console.log("==== Edit a Book ====");

        if (isDefinedAndNotNull(persistedBook)) {
            console.log("\nYou've updated the following information:");
            // @ts-ignore
            console.log("\n\tTitle: " + persistedBook.getTitle());
            // @ts-ignore
            console.log("\tAuthor: " + persistedBook.getAuthor());
            // @ts-ignore
            console.log("\tDescription: " + persistedBook.getDescription());
            // @ts-ignore
            console.log("\nBook["+persistedBook.getId()+"] Saved");
        } else {
            console.log("\nBook was not updated.");
        }

    });

program
    .command("search")
    .arguments('<searchKeyword...>')
    .description('Search book library.', {searchKeyword: 'search keyword'})
    .alias('s')
    .action((searchKeywords:Array<number|string>) => {
        const persistedBooks = bookDao.search(searchKeywords);

        console.log("==== Search books ====");
        let searchKeywordsMsg = "search keywords: ";
        searchKeywords.forEach(searchKeyword => searchKeywordsMsg += searchKeyword + " ");
        console.log(searchKeywordsMsg);

        if (Array.isArray(persistedBooks) && persistedBooks.length > 0) {
            persistedBooks.forEach(persistedBook => console.log("["+persistedBook.getId()+"] " + persistedBook.getTitle()));
        } else {
            console.log("No books found.");
        }
    });

program
    .command("detail")
    .arguments('<id>')
    .description('Get book details from library.', {id: 'book id'})
    .alias('d')
    .action((id:string) => {
        const persistedBook: any = bookDao.read(parseInt(id, 10));
        console.log("==== Book Details ====");

        if (isDefinedAndNotNull(persistedBook)) {
            console.log("\n\tTitle: " + persistedBook.getTitle());
            console.log("\tAuthor: " + persistedBook.getAuthor());
            console.log("\tDescription: " + persistedBook.getDescription());
            console.log("\nBook["+persistedBook.getId()+"] Saved");
        } else {
            console.log("Book not found.");
        }
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
