const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sampleData = JSON.parse(fs.readFileSync('./data/sample-data.json', 'utf-8'));

app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();

    let response = "I'm not sure how to answer that.";
    if (userMessage.includes('diet')) {
        response = `Your diet plan includes: ${sampleData.diet.join(', ')}.`;
    } else if (userMessage.includes('workout')) {
        response = `Your workout plan includes: ${sampleData.workout.join(', ')}.`;
    }

    res.json({ response });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
