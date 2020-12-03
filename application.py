import os


from flask import Flask, jsonify, render_template, request, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import requests
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.debug = True
app.config['SESSION_TYPE'] = 'filesystem'
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
socketio = SocketIO(app)


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username


@app.route("/")
def login():
    return render_template('login.html')


@app.route("/register")
def register():
    return render_template('register.html')


@app.route("/login_user", methods=['POST'])
def login_user():

    user = User.query.filter_by(email=request.form['email']).first()
    if (user.password == request.form['password']):

        return render_template('home.html')

    else:

        return render_template('login.html', title='Login')


@app.route('/post_user', methods=['POST'])
def post_user():
    user = User(request.form['username'],
                request.form['email'], request.form['password'])

    db.session.add(user)
    db.session.commit()

    return render_template('login.html')


@app.route("/chat")
def chat():
    return render_template("chat.html")


@socketio.on("submit")
def vote(x):
    emit("announce vote", x, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)
