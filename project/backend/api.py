from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from libraries.Functions import Functions
from libraries.Collector import Collector
import json

app = Flask(__name__)
CORS(app)

database = os.path.abspath('./database.db')
symbols = ['AAPL', 'MSFT', 'AMZN', 'GOOG']

sessions = []

functions = Functions(database)
collector = Collector(database, symbols=symbols, thread=True)


@app.route('/')
def index():
    return jsonify({'message': 'You are having fun, arent you?'})


@app.route('/api/v1/stocks/')
def stocks():
    function = request.args.get('function')
    if function == 'TIME_SERIES':
        return jsonify(functions.time_series(request.args))
    elif function == 'buy':
        return jsonify(functions.buy(request.args))
    elif function == 'sell':
        return jsonify(functions.sell(request.args))
    else:
        return jsonify({'status': 'error', 'error': 'Invalid request!'})


@app.route('/api/v1/account/')
def account():
    function = request.args.get('function')
    if function == 'REGISTER':
        data = functions.register(request.args)
        if data["status"] == "success":
            session_object = {'session': data['session_id'], 'user': data['id']}
            sessions.append(session_object)
        return jsonify(data)

    elif function == 'LOGIN':
        data = functions.login(request.args)
        if data["status"] == "success":
            session_object = {'session': data['session_id'], 'user': data['id']}
            sessions.append(session_object)
        return jsonify(data)

    else:
        return jsonify({'status': 'error', 'error': 'Invalid request!'})


if __name__ == '__main__':
    app.run()
