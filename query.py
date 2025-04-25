import requests
import json
from config import GROQ_API_URL, GROQ_KEY

with open("user.json") as f:
    USER = json.load(f)["user"]

headers = {
    "Authorization": f"Bearer {GROQ_KEY}",
    "Content-Type": "application/json"
}

def ask_fitness_bot(user_input):
    system_prompt = f"""
You are FitBuddy, a personal fitness coach for {USER['name']} (age: {USER['age']}, BMI: {USER['BMI']}). 
Their goal is: {USER['fitness_goal']} ({USER['experience_level']} level). 

Workout Schedule:
{', '.join([f"{day}: {workout}" for day, workout in USER['workout_routine'].items()])}

Diet: {USER['diet']['goal']} – Example meals include {USER['diet']['meals'][0]}, {USER['diet']['meals'][1]}, etc. 
Avoids: {USER['diet']['restrictions']}.

Other details:
- Water: {USER['water_intake_liters_per_day']}L/day
- Sleep: {USER['sleep_schedule']}
- Supplements: {', '.join(USER['supplements'])}
- Injuries: {USER['injuries']}

Respond like a friendly, knowledgeable coach with actionable advice. Keep responses brief and to the point (maximum 2-3 short paragraphs).
"""

    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": system_prompt.strip()},
            {"role": "user", "content": user_input.strip()}
        ],
        "temperature": 0.7,
        "max_tokens": 250
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        reply = result["choices"][0]["message"]["content"].strip()
        return reply

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        return "Sorry, I'm having trouble reaching your fitness coach right now."
