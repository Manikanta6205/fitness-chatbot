# FitChat AI - Fitness Chatbot

A personalized AI fitness coaching application that provides customized workout advice, nutrition guidance, and motivation based on user profiles and goals.

![FitChat AI Demo](https://youplaceholder.com/fitness-chatbot-demo.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [API Keys](#api-keys)
- [Usage](#usage)
- [Project Components](#project-components)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

FitChat AI is an intelligent fitness chatbot that provides personalized workout and nutrition guidance. The application uses LLM APIs (Groq/LLama/OpenAI) to generate contextually relevant responses based on a user's specific fitness profile, including exercise routines, diet preferences, and health metrics.

## ✨ Features

- **Personalized Fitness Guidance**: Tailored advice based on user profile data
- **Workout Routine Management**: Track and update workout schedules
- **Diet Planning**: Nutritional guidance aligned with fitness goals
- **Interactive Chat Interface**: User-friendly web interface with responsive design
- **Contextual Responses**: AI responses enriched with fitness domain knowledge
- **User Profile Management**: Store and update user preferences and fitness data
- **Suggestion Chips**: Quick-access prompts for common fitness questions

## 🏗️ Project Structure

```
fitness-chatbot/
├── app.py                     # Flask server for Python implementation
├── config.py                  # Configuration and API keys
├── index.html                 # Frontend chat interface
├── index.js                   # Node.js chat handling logic
├── query.py                   # Groq API integration for responses
├── server.js                  # Express server for Node.js implementation
├── user.json                  # User profile data
├── test.txt                   # Sample prompts for testing
├── services/
│   └── llama_service.js       # LLama model integration service
└── utils/
    ├── change_detector.js     # Detects user preference changes
    ├── csv_reader.js          # Reads workout data from CSV
    ├── json_updater.js        # Updates user profile data
    └── llama_context_builder.js  # Builds context for LLama model
```

## 💻 Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend Options**:
  - Python (Flask)
  - Node.js (Express)
- **AI Models**:
  - Groq (llama3-70b-8192)
  - OpenAI GPT-4
- **Data Storage**: JSON files, CSV for workout database

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+ (if using Flask backend)
- npm or yarn
- pip (if using Python)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fitchat-ai.git
   cd fitchat-ai
   ```

2. For Node.js implementation:
   ```bash
   npm install
   # or
   yarn install
   ```

3. For Python implementation:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your environment variables:
   ```bash
   # Create a .env file with your API keys
   touch .env
   ```

5. Start the server:
   ```bash
   # Node.js
   node server.js
   
   # Python
   python app.py
   ```

6. Open the frontend:
   ```
   # Open index.html in your browser or use a simple HTTP server
   python -m http.server 5500
   ```

## 🔑 API Keys

The application uses external LLM APIs. You'll need to obtain API keys from:

1. **Groq**: Create an account at [Groq](https://groq.com) to get your API key
2. **OpenAI** (alternative): Sign up at [OpenAI](https://openai.com) if using the OpenAI implementation

Update the `config.py` or `.env` file with your API keys:

```python
# config.py for Python implementation
GROQ_KEY = "your-groq-api-key"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
```

```
# .env for Node.js implementation
OPENAI_API_KEY=your-openai-api-key
```

## 📱 Usage

1. Start the backend server (Flask or Express)
2. Open the frontend in your browser
3. Begin chatting with FitChat AI by typing in the input field
4. Use suggestion chips for quick access to common fitness questions

### Example Prompts

- "What workout should I do today?"
- "Can you give me a 30-minute leg workout for Thursday?"
- "Suggest a protein-rich vegetarian dinner."
- "Why is sleep important for muscle recovery?"
- "I'm feeling lazy today. Motivate me to go to the gym."

## 🧩 Project Components

### Frontend (index.html)
The user interface is built with HTML, CSS, and JavaScript, providing:
- Clean, modern chat interface
- Message history display
- Typing indicators
- Quick-access suggestion chips
- Responsive design for mobile and desktop

### Backend Options

#### Python Implementation (Flask)
- `app.py`: HTTP server with CORS support
- `query.py`: Handles requests to the Groq API
- `config.py`: Configuration settings and API keys

#### Node.js Implementation (Express)
- `server.js`: Express server with OpenAI integration
- `index.js`: Chat handling logic
- Services and utilities for context enhancement

### Data Management
- `user.json`: Stores user profile data
- `utils/json_updater.js`: Updates user preferences
- `utils/change_detector.js`: Detects when users want to change routines or diets

### AI Enhancement
- `services/llama_service.js`: Enriches prompts with workout data
- `utils/llama_context_builder.js`: Formats data for context
- `utils/csv_reader.js`: Reads from workout database

## 🚀 Future Enhancements

- **User Authentication**: Add login functionality
- **Progress Tracking**: Log and visualize fitness progress
- **Image Recognition**: Upload gym equipment photos for exercise suggestions
- **Voice Interface**: Speech recognition for hands-free operation
- **Multiple User Profiles**: Support for household members
- **Exercise Animations**: Visual demonstrations of workouts
- **Calendar Integration**: Sync with Google Calendar/Apple Calendar
- **Wearable Device Integration**: Connect with fitness trackers

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
