from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Welcome to LLM Wrapper API"}

@app.route("/api/test", methods=["GET"])
def test():
    return {"message": "Hello from Flask!"}

if __name__ == "__main__":
    app.run(debug=True)