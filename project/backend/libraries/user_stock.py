def buy(stock, amount, user, database):
    try:
        buy = database.statement(
            f'SELECT close FROM time_series WHERE symbol = "{stock}" ORDER BY date DESC LIMIT 1')[0]['close']
        print(buy)
        database.statement(
            f'INSERT INTO user_stock (amount, buy, sell, stock, user) VALUES ("{amount}", "{buy}", 0,"{stock}", "{user}")')
        return {'status': 'success', 'message': 'Stock bought'}
    except Exception as e:
        return {f'status': 'error', 'error': {e}}


def sell(stock, amount, id, database):
    try:
        sell = database.statement(
            f'SELECT close FROM time_series WHERE symbol = "{stock}" ORDER BY date DESC LIMIT 1')[0]['close']

        oldAmount = database.statement(
            f'SELECT amount FROM user_stock WHERE id = "{id}"')[0]['amount']

        newAmount = oldAmount - amount

        database.statement(
            f'UPDATE user_stock SET amount = "{newAmount}", sell = "{sell}" WHERE id = "{id}"')
        return {'status': 'success', 'message': 'Stock sold'}
    except Exception as e:
        return {f'status': 'error', 'error': {e}}
