from flask import Flask, request, jsonify
from flask_cors import CORS

import sqlite3


app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['GET'])
def Articles():
    amount = request.args.get('amount', default=3, type=int)
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        articles = cur.execute(
            f'SELECT * FROM Articles LIMIT {amount}').fetchall()
    retdata = []
    for article in articles:
        retdata.append({k: article[k] for k in article.keys()})
    return jsonify(retdata)


if __name__ == "__main__":
    app.run(debug=True)
