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
    .parse(process.argv);

const options = program.opts();


if (!process.argv.slice(2).length) {
    program.outputHelp();
}
