require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
    const { userInput } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "You are a fitness assistant." }, { role: "user", content: userInput }],
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
