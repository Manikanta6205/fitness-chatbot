const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sampleData = JSON.parse(fs.readFileSync('./data/sample-data.json', 'utf-8'));

// Initialize the OpenAI client with the new syntax
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { 
                    role: 'system', 
                    content: `You are a fitness assistant. Use the following data for context: 
                    Diet: ${sampleData.diet.join(', ')}. 
                    Workout: ${sampleData.workout.join(', ')}.` 
                },
                { role: 'user', content: userMessage }
            ],
            max_tokens: 150,
        });

        const response = completion.choices[0].message.content.trim();
        res.json({ response });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ response: "I'm sorry, I couldn't process your request." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
