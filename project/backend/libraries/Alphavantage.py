import requests

def time_series(symbol, key):
	"""
	Get data from AlphaVantage API
	"""
	url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&apikey=' + key
	response = requests.get(url)
	return response.json()