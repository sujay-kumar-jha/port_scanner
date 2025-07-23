from flask import Flask, request, jsonify
import nmap
import json
import os
import requests
from flask_cors import CORS
from datetime import datetime
from auth import register_user, login_user, verify_user

app = Flask(__name__)
CORS(app)
scanner = nmap.PortScanner()
HISTORY_FILE = 'scan_history.json'

# Load history
if os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, 'r') as f:
        scan_history = json.load(f)
else:
    scan_history = []

@app.route('/register', methods=['POST'])
def register():
    return register_user(request.json)

@app.route('/login', methods=['POST'])
def login():
    return login_user(request.json)

@app.route('/scan', methods=['POST'])
def scan():
    data = request.json
    if not verify_user(data.get("username")):
        return jsonify({"error": "Unauthorized user"}), 401
    target = data['target']
    try:
        scanner.scan(hosts=target, arguments='-T4 -F')
        result = []
        geoip = requests.get(f"http://ip-api.com/json/{target}").json()
        for host in scanner.all_hosts():
            for proto in scanner[host].all_protocols():
                ports = scanner[host][proto].keys()
                for port in ports:
                    state = scanner[host][proto][port]['state']
                    name = scanner[host][proto][port].get('name', 'unknown')
                    result.append({
                        'port': port,
                        'state': state,
                        'service': name
                    })

        entry = {
            'user': data['username'],
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'geo': geoip,
            'results': result
        }
        scan_history.append(entry)
        with open(HISTORY_FILE, 'w') as f:
            json.dump(scan_history, f, indent=2)

        return jsonify({
            'geo': geoip,
            'results': result
        })
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/history/<username>', methods=['GET'])
def history(username):
    user_history = [entry for entry in scan_history if entry['user'] == username]
    return jsonify(user_history)

if __name__ == '__main__':
    app.run(debug=True)