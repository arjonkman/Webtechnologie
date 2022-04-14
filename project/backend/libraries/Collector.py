import threading
from time import sleep
import yfinance as yf
import pandas
import sqlite3
import json

class Collector:
    def __init__(self, database, symbols=[], thread=False):
        self.database = database
        self.symbols = symbols
        self.thread = thread
        if self.thread:
            t = threading.Thread(target=self.t_run, daemon=True).start()

    def t_run(self):
        """Update database every 5 minutes
        """
        while True:
            for symbol in self.symbols:
                json_data = self.data(symbol)
                self.json_to_db(json_data)
            sleep(300)

    def run(self):
        for symbol in self.symbols:
            json_data = self.data(symbol)
            self.json_to_db(json_data)

    def data(self, symbol):
        ticker = yf.Ticker(symbol)
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