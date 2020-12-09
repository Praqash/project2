import os


from flask import Flask, jsonify, render_template, request, url_for, flash, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, UserMixin, login_required
import requests
from flask_session import Session
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
db.init_app(app)
socketio = SocketIO(app)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class User(db.Model,  UserMixin):
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


@app.route("/home")
@login_required
def home():
    return render_template('home.html')


@app.route("/register")
def register():
    return render_template('register.html')


@app.route("/logout", methods=['GET', 'POST'])
def logout():
    logout_user()
    return redirect(url_for('/'))


@app.route("/loginUser", methods=['POST'])
def loginUser():

    user = User.query.filter_by(email=request.form['email']).first()
    if (user.password == request.form['password']):
        login_user(user)
        return render_template('home.html')

    else:

        return render_template('login.html', title='Login')


@ app.route('/post_user', methods=['POST'])
def post_user():
    user = User(request.form['username'],
                request.form['email'], request.form['password'])

    db.session.add(user)
    db.session.commit()

    return render_template('login.html')


@ app.route("/chat", methods=['GET', 'POST'])
@login_required
def chat():
    return render_template("chat.html")


@ socketio.on("submit")
def vote(x):

    emit("announce vote", x, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)
