import yfinance as yf
import pandas
import sqlite3
import json


class symbol_to_database:
    def __init__(self, database, symbol):
        self.database = database
        self.symbol = symbol

    def run(self):
        json_data = self.data()
        self.json_to_db(json_data)

    def data(self):

        ticker = yf.Ticker(self.symbol)
        data = ticker.history(period='60d', interval="5m")
        jsonData = pandas.DataFrame.to_json(data, orient='table')
        return jsonData

    def json_to_db(self, json_data):
        jData = json.loads(json_data)

        with sqlite3.connect(self.database) as con:
            cur = con.cursor()
            for row in jData['data']:
                time = row['Datetime']
                openr = row['Open']
                high = row['High']
                low = row['Low']
                close = row['Close']
                volume = row['Volume']

                try:
                    cur.execute(
                        f'INSERT INTO time_series (date, symbol, open, high, low, close, volume) VALUES ("{time}", "{self.symbol}", "{openr}", "{high}", "{low}", "{close}", "{volume}")')
                except:
                    pass
            con.commit()
        print('Data inserted')
