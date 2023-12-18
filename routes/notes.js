//import required modules
const api = require ('express').Router();
const uuid = require('../lib/uuid');
const fs = require('fs');
let database = require('../db/db.json');

//handle get request to retrieve all notes
api.get('/', (req,res) => {
    fs.readFile('./db/db.json', 'utf-8', (data) => res.json(JSON.parse(data)))
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
        fs.readFile('./db/db.json', 'utf-8',(data) => {
            const oldDataArr = JSON.parse(data);
            oldDataArr.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(oldDataArr, null, '\t'))
        })
    } else {
        console.log('There has been an error processing the request')
    }
})

//handles the delete request to delete a note by id 
api.delete('/:id', (req,res) => {
    let notesKept = [];
    for (let i=0; i<database.length; i++) {
        if (database[i].id != req.params.id) {
            notesKept.push(database[i]);
        }
    }
//update the database wit hthe notes to be kept 
    database = notesKept;
    fs.writeFileSync('./db/db,json', JSON.stringify(database,null, '\t'))
    res.json(database);
})

//exports the configured API router for use in other parts of the application 
module.exports = api;