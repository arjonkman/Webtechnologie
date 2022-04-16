import time
from Sequel import Sequel


def buy(stock, amount, user, database):
    buy = database.statement(
        f'SELECT close FROM time_series WHERE symbol = "{stock}" ORDER BY date DESC LIMIT 1')[0]['close']
    print(buy)
    database.statement(
        f'INSERT INTO user_stock (amount, buy, sell, stock, user) VALUES ("{amount}", "{buy}", 0,"{stock}", "{user}")')


def sell(stock, amount, id, database):
    sell = database.statement(
        f'SELECT close FROM time_series WHERE symbol = "{stock}" ORDER BY date DESC LIMIT 1')[0]['close']

    oldAmount = database.statement(
        f'SELECT amount FROM user_stock WHERE id = "{id}"')[0]['amount']

    newAmount = oldAmount - amount

    database.statement(
        f'UPDATE user_stock SET amount = "{newAmount}", sell = "{sell}" WHERE id = "{id}"')
