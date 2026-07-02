const chalk = require("chalk");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const notes = require("./notes.js");

const parser = yargs(hideBin(process.argv));

// Customize yargs version
parser.version("1.1.0");

// Create add command
parser.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
parser.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
parser.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  },
});

// Create read command
parser.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

parser.parse();
