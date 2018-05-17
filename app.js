const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
      title: titleOptions,
      body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
      title: titleOptions
    })
    .command('remove', 'Remove a note', {
      title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note === undefined) {
    console.log('Note Already Taken.');
  } else {
    console.log('Note Added.');
    notes.loadNote(note);
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.loadNote(note));
} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if (note === undefined){
    console.log('Note not found.');
  } else {
    console.log('Note Found');
    notes.loadNote(note);
  }
} else if (command === 'remove') {
  var remNote = notes.removeNote(argv.title);
  var msg = remNote ? 'Note was removed' : 'Note not found';
  console.log(msg);
} else {
  console.log('Command not recognized');
}
