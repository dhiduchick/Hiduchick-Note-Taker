const api = require ('express').Router();
const uuid = require('../lib/uuid');
const fs = require('fs');
let database = require('../db/db.json');

api.get('/', (req,res) => {
    fs.readFile('./db/db.json', 'utf-8', (data) => res.json(JSON.parse(data)))
})

api.post('/', (req,res) => {
    const { title, text } = req.body;
    if (req.body && title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        }

        fs.readFile('./db/db.json', 'utf-8',(data) => {
            const oldDataArr = JSON.parse(data);
            oldDataArr.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(oldDataArr, null, '\t'))
        })
    } else {
        console.log('There has been an error processing the request')
    }
})

api.delete('/:id', (req,res) => {
    let notesKept = [];
    for (let i=0; i<database.length; i++) {
        if (database[i].id != req.params.id) {
            notesKept.push(database[i]);
        }
    }

    database = notesKept;
    fs.writeFileSync('./db/db,json', JSON.stringify(database,null, '\t'))
    res.json(database);
})

module.exports = api;