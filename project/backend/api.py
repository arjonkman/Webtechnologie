import yfinance as yf
from flask import Flask, request, jsonify
from flask_cors import CORS
from libraries.Functions import Functions
from libraries.Alphavantage import Alpha
from libraries.Sequel import Sequel
import sqlite3

# TODO Creating a Database

database = Sequel('database.db')

app = Flask(__name__)
CORS(app)
alpha = Alpha(keys=['UVXYOCOIO228DFM2'])
functions = Functions('database.db')


@app.route('/')
def index():
    return jsonify({'message': 'You are having fun, arent you?'})


@app.route('/api/v1/')
def api():
    function = request.args.get('function')
    # Python heeft sinds 3.10 een switch statement mogelijkheid, om ervoor te zorgen dat de
    # backend draait op meer versies gebruiken we een if elif statement
    # print(request.args)
    if function == 'TIME_SERIES':
        return jsonify(functions.time_series(request.args))
    else:
        return jsonify({'message': 'Invalid request!'})


@app.route('/api/data/<symbol>')
def data(symbol):
    jsonData = jsonify(alpha.time_series(symbol))
    symbol = yf.Ticker(symbol)
    # get historical data from yahoo finance
    historical_data = symbol.history(period='max')
    print(historical_data)
    return historical_data


if __name__ == '__main__':
    p = database.time_series(
        'SELECT * FROM stock')
    print(p)
    # data('FB')
    app.run(debug=True)
    pass
