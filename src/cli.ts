#!/usr/bin/env node

import {BookDao} from "./book.dao";
import {BookLowDbDao} from "./book.lowdb.dao";
import {BookModel} from "./book.model";

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();
console.log(
    chalk.blue(
        figlet.textSync('book-database', { horizontalLayout: 'full' })
    )
);

const bookDao: BookDao = new BookLowDbDao();

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
        bookDao.getBooks().forEach((book)=> console.log("["+book.id+"] " + book.title));
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

        const persistedBook = bookDao.create(new BookModel(title, author, description));

        console.log("==== Add a Book ====");
        console.log("\nYou've entered the following information:");
        console.log("\n\tTitle: " + persistedBook.getTitle());
        console.log("\tAuthor: " + persistedBook.getAuthor());
        console.log("\tDescription: " + persistedBook.getDescription());
        console.log("\nBook["+persistedBook.getId()+"] Saved");
    });

program
    .command("edit")
    .description('Edit a book.')
    .alias('e')
    .action((id:any) => {
        const options = program.opts(),
            hasOptions = (options !== null && options !== undefined),
            title = (hasOptions) ? options.title : null,
            author = (hasOptions) ? options.author : null,
            description = (hasOptions) ? options.description : null;

        console.log("id: " + id);
        console.log("id is a number: " + !isNaN(parseInt(id, 10)));
        const persistedBook = bookDao.update(new BookModel(title, author, description, parseInt(id, 10)));

        console.log("==== Edit a Book ====");
        console.log("\nYou've entered the following information:");
        console.log("\n\tTitle: " + persistedBook.getTitle());
        console.log("\tAuthor: " + persistedBook.getAuthor());
        console.log("\tDescription: " + persistedBook.getDescription());
        console.log("\nBook["+persistedBook.getId()+"] Saved");
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
