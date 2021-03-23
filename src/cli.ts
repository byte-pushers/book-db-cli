#!/usr/bin/env node

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

program
    .version('0.0.1')
    .description("A database to add or edit books")
    .option('-v, --view-all', "View all books.")
    .option('-a, --add', "Add a books.")
    .option('-e, --edit', "Edit a books.")
    .option('-se, --search', "Search for a books.")
    .option('-sa, --save', "Save and Exit.")
    .parse(process.argv);

const options = program.opts();

// console.log('you ordered a pizza with:');

if (options.viewAll) console.log('  - view-all');
if (options.add) console.log('  - add');
if (options.edit) console.log('  - edit');
if (options.search) console.log('  - search');
if (options.save) console.log('  - save');

/*const cheese: string = true === program.cheese ? 'marble' : program.cheese || 'no';
console.log('  - %s cheese', cheese);*/


if (!process.argv.slice(2).length) {
    program.outputHelp();
}
