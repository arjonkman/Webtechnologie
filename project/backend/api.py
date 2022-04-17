from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from libraries.Functions import Functions
from libraries.Collector import Collector
from pandas import DataFrame

app = Flask(__name__)
CORS(app)

database = os.path.abspath('./database.db')
symbols = ['AAPL', 'MSFT', 'AMZN', 'GOOG']

sessions = {}

functions = Functions(database)
collector = Collector(database, symbols=symbols, thread=True)


@app.route('/')
def index():
    return jsonify({'message': 'You are having fun, arent you?'})


@app.route('/api/v1/stocks/')
def stocks():
    function = request.args.get('function')
    if function == 'TIME_SERIES':
        data = functions.time_series(request.args)
        newData = DataFrame(data).to_csv(sep='\t')
        return newData
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
            sessions[data['session_id']] = data['id']
        return jsonify(data)
    
    elif function == 'LOGIN':
        data = functions.login(request.args)
        if data["status"] == "success":
            sessions[data['session_id']] = data['id']
        return jsonify(data)
    
    elif function == 'LOGOUT':
        session_id = request.args.get('session_id')
        print(session_id)
        sessions.pop(session_id)
        return jsonify({'status': 'Succesfully logged out!'})

    else:
        return jsonify({'status': 'error', 'error': 'Invalid request!'})


if __name__ == '__main__':
    app.run()
