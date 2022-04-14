from flask import Flask, request, jsonify
from flask_cors import CORS
from libraries.Sequel import Sequel
from libraries.Functions import Functions
import os

# TODO Creating a Database
app = Flask(__name__)
CORS(app)
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


if __name__ == '__main__':
    app.run(debug=True)
