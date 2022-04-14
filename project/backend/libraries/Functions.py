from libraries.Sequel import Sequel


class Functions:
    def __init__(self, database):
        self.sql = Sequel(database)

    def time_series(self, args):
        symbol = args.get('symbol')
        if symbol is None:
            return {'status': 'error', 'error': 'No symbol provided'}
        data = self.sql.time_series(symbol)
        return data

    def register(self, args):
        fname = args.get('fname')
        lname = args.get('lname')
        email = args.get('email')
        password = args.get('password')
        if fname is None or lname is None or email is None or password is None:
            return {'error': 'Missing data'}
        data = self.sql.register(fname, lname, email, password)
        return data
    
    def login(self, args):
        email = args.get('email')
        password = args.get('password')
        if email is None or password is None:
            return {'error': 'Missing data'}
        data = self.sql.login(email, password)
