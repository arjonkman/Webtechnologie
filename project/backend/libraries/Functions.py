from libraries.Sequel import Sequel


class Functions:
    def __init__(self, database):
        self.sql = Sequel(database)

    def time_series(self, args):
        symbol = args.get('symbol')
        if symbol is None:
            return {'error': 'Symbol is required!'}
        return self.sql.time_series()

    def register(self, args):
        fname = args.get('fname')
        lname = args.get('lname')
        email = args.get('email')
        password = args.get('password')
        if fname is None or lname is None or email is None or password is None:
            return {'error': 'Username and password are required!'}
        return self.sql.register(fname, lname, email, password)
