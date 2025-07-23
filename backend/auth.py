import json
import os

USER_FILE = 'users.json'

if os.path.exists(USER_FILE):
    with open(USER_FILE, 'r') as f:
        users = json.load(f)
else:
    users = {}

def save_users():
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=2)

def register_user(data):
    username = data.get('username')
    password = data.get('password')
    if username in users:
        return {"message": "User already exists"}, 400
    users[username] = password
    save_users()
    return {"message": "Registered successfully"}, 201

def login_user(data):
    username = data.get('username')
    password = data.get('password')
    if users.get(username) == password:
        return {"message": "Login successful"}, 200
    return {"message": "Invalid credentials"}, 401

def verify_user(username):
    return username in users