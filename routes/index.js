//importing express
const router = require('express').Router();

//importing notes.js file 
const notesRouter = require('./notes');

//any request with a URL that begins with "/notes" will be routed to the notesRouter for further handling.
router.use('/notes', notesRouter);


module.exports = router;
