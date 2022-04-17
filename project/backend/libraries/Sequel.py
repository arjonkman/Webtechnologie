import sqlite3
from hashlib import md5
from random import choice
from string import ascii_letters
import libraries.user_stock as user_stock


class Sequel:
    def __init__(self, database):
        self.database = database

    def statement(self, statement):
        def row_to_dict(cursor: sqlite3.Cursor, row: sqlite3.Row) -> dict:
            data = {}
            for idx, col in enumerate(cursor.description):
                data[col[0]] = row[idx]
            return data

        with sqlite3.connect(self.database) as conn:
            conn.row_factory = row_to_dict
            result = conn.execute(statement)
            return result.fetchall()

    def buy(self, args):
        # Get the stock the user wants to buy
        stock = args.get('stock')
        amount = args.get('amount')
        user = args.get('user')
        return user_stock.buy(stock, amount, user, self.database)

    def sell(self, args):
        # Get the stock the user wants to sell
        stock = args.get('stock')
        amount = args.get('amount')
        id = args.get('id')
        return user_stock.sell(stock, amount, id, self.database)
    
    def idGen(self, email):
        rnd_letters = ''.join(choice(ascii_letters)
                              for _ in range(26)).encode('utf-8')
        session_id = md5(email.encode('utf-8') + rnd_letters).hexdigest()
        return session_id

    def balance(self, user):
        # Get the balance of the user
        return user_stock.balance(user, self.database)

    def get_user_stocks(self, user):
        # Get all the stocks the user owns
        return user_stock.stock_amount(user, self.database)

    def register(self, fname, lname, email, password):
        try:
            # Add the new user to the database
            self.statement(
                f'INSERT INTO account (firstname, lastname, balance, email, password) VALUES ("{fname}", "{lname}", "100000", "{email}", "{password}")')
            session_id = self.idGen(email)
            return {'status': 'success', 'session_id': session_id}
        except:
            return {'status': 'error', 'error': 'Could not create account'}
        
        # Get the user's id
        user_id = self.statement(f'SELECT id FROM account WHERE email = "{email}"')[0]['id']

        session_id = self.idGen(email)

        return {'status': 'success', 'session_id': session_id, 'id': user_id}

    def login(self, email, password):
        if self.statement(f'SELECT * FROM account WHERE email = "{email}" AND password = "{password}"') == []:
            return {'status': 'error', 'error': 'Invalid login'}

        session_id = self.idGen(email)
        return {'status': 'success', 'session_id': session_id}

    def time_series(self, symbol):
        return self.statement(f'SELECT close, open, high, low, date, volume FROM time_series WHERE symbol = "{symbol}" ORDER BY date ASC')
