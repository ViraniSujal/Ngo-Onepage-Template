const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ContactUs');
}
const port = 8000;

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phoneno: String,
    email: String,
    address: String,
    age: String,
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved in database")
    });

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});