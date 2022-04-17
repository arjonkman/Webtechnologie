def buy(stock, amount, user, database):
    try:
        # Get the current stock price
        buy = database.statement(
            f'SELECT close FROM time_series WHERE symbol = "{stock}" ORDER BY date DESC LIMIT 1')[0]['close']
        print(buy)

        # Verify that the user has enough money to buy the stock
        balance_account = database.statement(
            f'SELECT balance FROM account WHERE id = "{user}"')[0]["balance"]
        total_price = amount * buy
        if total_price > balance_account:
            return {'status': 'error', 'error': 'You do not have enough funds to buy this ammount of stock'}

        # Update the user's "orderbook"
        database.statement(
            f'INSERT INTO user_stock (amount, buy, sell, stock, user) VALUES ("{amount}", "{buy}", 0,"{stock}", "{user}")')

        # Update the user's balance
        database.statement(
            f'UPDATE account SET balance = balance - "{amount*buy}" WHERE email = "{user}"')
        return {'status': 'success', 'message': 'Stock bought'}
    except Exception as e:
        return {f'status': 'error', 'error': {e}}


def sell(stock, amount, id, database):
    try:
        # Get the current stock price
        sell = database.statement(
            f'SELECT close FROM time_series WHERE symbol = "{stock}" ORDER BY date DESC LIMIT 1')[0]['close']

        # Get the amount of stock the user has
        oldAmount = database.statement(
            f'SELECT amount FROM user_stock WHERE id = "{id}"')[0]['amount']

        # Verify that the user has more or equal than the amount they are selling
        newAmount = oldAmount - amount
        if newAmount < 0:
            return {'status': 'error', 'error': 'You do not have enough stocks to sell this amount'}

        # Update the user's "orderbook"
        database.statement(
            f'UPDATE user_stock SET amount = "{newAmount}", sell = "{sell}" WHERE id = "{id}"')

        # Update the user's balance
        user_account = database.statement(
            f'SELECT user FROM user_stock WHERE id = "{id}"')[0]["user"]
        database.statement(
            f'UPDATE account SET balance = balance + "{amount*sell}" WHERE id = "{ user_account }"')

        return {'status': 'success', 'message': 'Stock sold'}
    except Exception as e:
        return {f'status': 'error', 'error': {e}}


def balance(database, id):
    try:
        # Get the user's balance
        userBalance = database.statement(
            f'SELECT balance FROM account WHERE id = "{id}"')[0]['balance']
        return {'status': 'success', 'message': f'{userBalance}'}
    except Exception as e:
        return {f'status': 'error', 'error': {e}}


def stock_amount(database, id):
    try:
        # Get the user's balance
        userStocks = database.statement(
            f'SELECT amount FROM user_stock WHERE id = "{id}"')[0]['amount']
        return {'status': 'success', 'message': f'{userStocks}'}
    except Exception as e:
        return {f'status': 'error', 'error': {e}}
