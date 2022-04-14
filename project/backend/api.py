from flask import Flask, request, jsonify
from flask_cors import CORS
from libraries.Sequel import symbol_to_database
import os

# TODO Creating a Database
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify({'message': 'You are having fun, arent you?'})


@app.route('/api/data/<symbol>')
def data(symbol):
    database = symbol_to_database(
        f'{os.getcwd()}\\project\\backend\\database.db', symbol)
    database.run()
    return database.data()


if __name__ == '__main__':
    app.run(debug=True)
