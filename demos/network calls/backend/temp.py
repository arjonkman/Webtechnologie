import sqlite3
import json


def Articles():
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        articles = cur.execute('SELECT * FROM Articles').fetchall()
    data = {}
    for article in articles:
        data[article[0]] = {k: article[k] for k in article.keys()}
    return json.dumps(data)


print(Articles())
