def time_series(args):
    symbol = args.get('symbol')
    if symbol is None:
        return {'error': 'Symbol is required!'}
    return symbol