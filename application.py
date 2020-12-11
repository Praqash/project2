import os

from flask import Flask, render_template, request, redirect, url_for, flash
from flask_socketio import SocketIO, join_room, leave_room
from flask import Flask, jsonify, render_template, request, url_for, flash, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, UserMixin, login_required, current_user
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
    if user:
        if ((user.password != request.form['password']) and (user.email == request.form['email'])):
            flash("Incorrect Password", 'danger')
            return render_template('login.html', title='Login')

        else:
            if ((user.password == request.form['password']) and (user.email == request.form['email'])):
                login_user(user)
                return render_template('home.html')

    else:
        return render_template('register.html', title='Login')
        flash("Email does not exist!", 'warning')


@ app.route('/post_user', methods=['POST'])
def post_user():
    user = User(request.form['username'],
                request.form['email'], request.form['password'])

    temp2 = user.query.filter_by(email=request.form['email']).first()

    if temp2:
        flash("Account already exist", 'warning')
        return render_template('login.html')
    else:
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
        return render_template('register.html', title='Register')


@ app.route('/chat')
@ login_required
def chat():
    if current_user.is_authenticated:
        return render_template('chat.html', username={current_user.username})

    else:
        return render_template('login.html')


@ socketio.on('send_message')
def handle_send_message_event(data):
    app.logger.info("{} has sent message to the room {}: {}".format(data['username'],
                                                                    data['room'],
                                                                    data['message']))
    socketio.emit('receive_message', data, room=data['room'])


@ socketio.on('join_room')
def handle_join_room_event(data):
    app.logger.info("{} has joined the room {}".format(
        data['username'], data['room']))
    join_room(data['room'])
    socketio.emit('join_room_announcement', data, room=data['room'])


@ socketio.on('leave_room')
def handle_leave_room_event(data):
    app.logger.info("{} has left the room {}".format(
        data['username'], data['room']))
    leave_room(data['room'])
    socketio.emit('leave_room_announcement', data, room=data['room'])


if __name__ == '__main__':
    socketio.run(app, debug=True)
