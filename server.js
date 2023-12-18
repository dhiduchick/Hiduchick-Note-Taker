//import required modules 
const express = require('express');
const path = require('path');
const api = require('./routes/index');

//create an express application 
const app = express();
const PORT = process.env.PORT || 3001;

//adding middleware 
app.use(express.json());
app.use(express.static('public'));
app.use('./api', api)

//define a route for serving the notes.html file 
app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, 'public/notes.html')));


//define a catch-all route for serving the index.html file 
app.get('*', (req,res) =>
res.sendFile(path.join(__dirname, 'public/index.html')));


//start the server and listen on the specified port
app.listen(PORT, () =>
console.log(`This application is listening at http://localhost:${PORT}`));