from flask import Flask, request, jsonify
from flask_cors import CORS
from libraries.Functions import Functions
from libraries.Collector import Collector

app = Flask(__name__)
CORS(app)

database = 'database.db'
symbols = ['AAPL', 'MSFT', 'AMZN', 'GOOG']

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
    else:
        return jsonify({'error': 'Invalid request!'})

    
@app.route('/api/v1/account')
def account():
    function = request.args.get('function')
    if function == 'REGISTER':
        ...
    elif function == 'LOGIN':
        ...
    else:
        return {'error': 'Invalid request!'}


if __name__ == '__main__':
    app.run(debug=True)
