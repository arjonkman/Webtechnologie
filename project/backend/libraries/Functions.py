from libraries.Sequel import Sequel


class Functions:
    def __init__(self, database):
        self.sql = Sequel(database)

    def time_series(self, args):
        symbol = args.get('symbol')
        if symbol is None:
            return {'error': 'Symbol is required!'}
        return self.sql.time_series()
