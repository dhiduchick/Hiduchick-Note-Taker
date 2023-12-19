//import required modules
const api = require ('express').Router();
const uuid = require('../helper/uuid');
const fs = require('fs');
let database = require('../db/db.json');

const util = require('util')
const readFileAsync = util.promisify(fs.readFile);


//handle get request to retrieve all notes
api.get('/', (req,res) => {
    readFileAsync('./db/db.json', 'utf-8', (err, data) => res.json(JSON.parse(data)))
})


//handle post request to create a new note
api.post('/', (req,res) => {
    const { title, text } = req.body;
    if (req.body && title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        }
//read the contens of the database file / write the update data back to the database file 
        fs.readFile('./db/db.json', 'utf-8',(err, data) => {
            const oldDataArr = JSON.parse(data);
            oldDataArr.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(oldDataArr, null, '\t'), (err) =>
            err ? res.status(500).json('There has been an error in posting the note') : res.end())
        })
    } else {
        console.log('There has been an error processing the request')
    }
})

// Handles the delete request to delete a note by id
// api.delete('/:id', (req, res) => {
//     const noteIdsToDelete = Array.isArray(req.params.id) ? req.params.id : [req.params.id];
//     // Filter out the note with the specified id
//     let notesKept = database.filter((note) => !noteIdsToDelete.includes(note.id));

//     // Update the database with the notes to be kept
//     database = notesKept;

//     // Write the updated database to the file
//     fs.writeFile('./db/db.json', JSON.stringify(database, null, '\t'), (err) => {
//         if (err) {
//             // If there is an error, send a 500 Internal Server Error response
//             res.status(500).json('There has been an error in deleting this note');
//         } else {
//             // If successful, send a JSON response with the updated database
//             res.json(database);
//         }
//     });
// });

api.delete('/:id', (req, res) => {
    let notesToKeep = [];
    for (let i = 0; i < database.length; i++) {
        if (database[i].id != req.params.id) {
            notesToKeep.push(database[i]);
        }
    }

    database = notesToKeep;

    try {
        fs.writeFileSync('./db/db.json', JSON.stringify(database, null, '\t'));
        res.json(database);
    } catch (err) {
        res.status(500).json('Error in deleting note');
    }
});


//exports the configured API router for use in other parts of the application 
module.exports = api;