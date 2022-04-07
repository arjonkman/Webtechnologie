import requests
import threading
from time import sleep
from datetime import datetime, timedelta
import json
from random import choice


class Alpha:
    def __init__(self, keys=[], symbols=['FB', 'AAPL', 'AMZN', 'NFLX', 'GOOGL']):
        self.keys = keys
        self.symbols = symbols
        self.done = False
        self.tasks = [[symbol, datetime.now() - timedelta(minutes=60)]
                      for symbol in self.symbols]
        print(self.tasks)

        alpha = threading.Thread(target=self.thread, daemon=True)
        alpha.start()

    def thread(self):
        while not self.done:
            for task in self.tasks:
                print(task)
                if task[1] < datetime.now() - timedelta(minutes=30):
                    print('downloading')
                    with open('./data/' + task[0] + '.json', 'w') as file:
                        file.write(json.dumps(
                            self.time_series(task[0], choice(self.keys))))
                else:
                    print('weird')
                    sleep(5)
            sleep(60)

    def time_series(self, symbol, key):
        """
        Get data from AlphaVantage API
        """
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + \
            symbol + '&interval=5min&apikey=' + key
        response = requests.get(url)
        return response.json()
