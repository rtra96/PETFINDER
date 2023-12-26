// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as a static index.html file
    console.log(pets);
    res.sendFile(__dirname + '/public/index.html'); 
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.json({ pets });
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request query
    const owner = req.query.owner;
    console.log('Searching for pet with owner:', owner);

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    if (pet) {
        res.json({ pet });
    } else {
        console.log('Pet not found');
        res.status(404).json({ error: 'Pet not found' });
    }
});



// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request params
    const name = req.params.name;
    console.log('Searching for pet with name:', name);

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    if (pet) {
        res.json({ pet });
    } else {
        console.log('Pet not found');
        res.status(404).json({ error: 'Pet not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
module.exports = app;
