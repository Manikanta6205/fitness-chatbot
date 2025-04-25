from flask import Flask, request, jsonify
from flask_cors import CORS
from query import ask_fitness_bot

app = Flask(__name__)
# Enable CORS for the Flask app
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('userInput', '')
    reply = ask_fitness_bot(user_input)
    return jsonify({'reply': reply})

if __name__ == "__main__":
    app.run(debug=True)