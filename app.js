const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load data from JSON file
let data = JSON.parse(fs.readFileSync('data.json'));

// Get courses
app.get('/api/courses', (req, res) => {
    res.json(data.courses);
});

// Get teachers
app.get('/api/teachers', (req, res) => {
    res.json(data.teachers);
});

// Submit feedback
app.post('/api/feedback', (req, res) => {
    const feedback = req.body;
    // Ideally, save feedback to a database
    
    console.log('Feedback received:', feedback);
    res.status(201).send('Feedback submitted');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

