import os


from flask import Flask, jsonify, render_template, request
import requests
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/chat")   
def chat():
    return render_template("chat.html")

@socketio.on("submit")
def vote(x):
   emit("announce vote", x , broadcast=True)

if __name__ == '__main__':
  socketio.run( app, debug = True )
