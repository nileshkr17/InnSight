from flask import Flask, jsonify
import pandas as pd
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://localhost:5173'])  

data = pd.read_csv('data.csv')

@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome Visitor!</h1>"

@app.route('/hotels', methods=['GET'])
def get_hotels():
    top_100_hotels = data.head(50)

    hotels_json = top_100_hotels.to_json(orient='records')

    hotels_dict = json.loads(hotels_json)

    return jsonify({"hotels": hotels_dict})



if __name__ == '__main__':
    app.run(debug=True)
