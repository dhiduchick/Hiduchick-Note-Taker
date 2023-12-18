const api = require ('express').Router();
const uuid = require('../lib/uuid');
const fs = require('fs');
let database = require('../db/db.json');

api.get('/', (req,res) => {
    fs.readFile('./db/db.json', 'utf-8', (data) => res.json(JSON.parse(data)))
})

