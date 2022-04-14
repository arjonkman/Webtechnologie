import sqlite3
from hashlib import md5
from random import choice
from string import ascii_letters

class Sequel:
    def __init__(self, database):
        self.database = database

    def statement(self, statement):
        ret = ''
        with sqlite3.connect(self.database) as con:
            cur = con.cursor()
            try:
                ret = cur.execute(statement)
            except sqlite3.OperationalError as e:
                print(e)
                return 'error'
            ret = tuple(ret)
            con.commit()
        try:
            ret[1][0]
            ret[0][1]
        except IndexError:
            ret = tuple([inner for outer in zip(*ret) for inner in outer])
        return ret

    def register(self, fname, lname, email, password):
        # Check for the email if it already exists
        if self.statement(f'SELECT * FROM account WHERE email = "{email}"') == 'error':
            return {'status': 'error', 'error': 'Account already exists'}
        
        # Add the new user to the database
        if self.statement(f'INSERT INTO account (firstname, lastname, balance, email, password) VALUES ("{fname}", "{lname}", "100000", "{email}", "{password}")') == 'error':
            return {'status': 'error', 'error': 'Could not create account'}
        
        rnd_letters = ''.join(choice(ascii_letters) for _ in range(26)).encode('utf-8')
        session_id = md5(email.encode('utf-8') + rnd_letters).hexdigest()
        
        return {'status': 'success', 'session_id': session_id}
    
    def login(self, email, password):
        if self.statement(f'SELECT * FROM account WHERE email = "{email}" AND password = "{password}"') == 'error':
            return {'status': 'error', 'error': 'Invalid login'}
        
        rnd_letters = ''.join(choice(ascii_letters) for _ in range(26)).encode('utf-8')
        session_id = md5(email.encode('utf-8') + rnd_letters).hexdigest()
        return {'status': 'success', 'session_id': session_id}

    def time_series(self, symbol):
        self.statement()