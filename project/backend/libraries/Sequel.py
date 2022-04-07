import sqlite3


class Sequel:
    def __init__(self, database):
        self.database = database

    def statement(self, statement):
        ret = ''
        with sqlite3.connect(self.database) as con:
            cur = con.cursor()
            ret = tuple(cur.execute(statement))
            con.commit()
        try:
            ret[1][0]
            ret[0][1]
        except IndexError:
            ret = tuple([inner for outer in zip(*ret) for inner in outer])
        return ret

    def time_series(self, symbol):
        return self.statement(f'')
