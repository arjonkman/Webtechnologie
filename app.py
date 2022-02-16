from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world(name=None):
    return render_template('index.html', name=name)

@app.route('/noice')
def noice(name=None):
    return render_template('noice.html', name=name)