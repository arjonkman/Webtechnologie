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
        data = functions.time_series(request.args)
        newData = DataFrame(data).to_csv(sep='\t')
        # with open('stocks.tsv', 'w', newline='') as tsvF:
        #     tsvWriter = csv.writer(tsvF, delimiter='\t')
        #     tsvWriter.writerow(['close', 'open', 'high',
        #                        'low', 'date', 'volume'])
        #     for item in data:
        #         tsvWriter.writerow(item.values())
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
            sessions.append(data['session_id'])
        return jsonify(data)

    elif function == 'LOGIN':
        data = functions.login(request.args)
        if data["status"] == "success":
            sessions.append(data['session_id'])
        return jsonify(data)

    else:
        return jsonify({'status': 'error', 'error': 'Invalid request!'})


if __name__ == '__main__':
    app.run()
