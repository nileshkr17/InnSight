# -*- coding: utf-8 -*-
import pandas as pd
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://localhost:5173'])

df = pd.read_csv("makemytrip_com-travel_sample.csv", on_bad_lines='skip')


    #break the highlight_value into words and make a cluster of the words and then find the hotels which are in the cluster of the highlight_value
    #for example if the highlight_value is "good food" then the cluster will be the hotels which have good food in their reviews
    #if the highlight_value is "good location" then the cluster will be the hotels which have good location in their reviews
    #give code
    #for the above logic
    #you can use the following code
    #form the cluster of the following words hotelPreferences
#Object
#amenities
#Array (empty)
#wifi
#false
#doctor24x7
#false
#petAllowed
#false
#marriedCoupleFriendly
#false
#unmarriedCoupleFriendly
#false
#oldAgeFriendly
#false
#poolGymBar
#false
#roomService

def preprocess_data(df, highlight_value):
    if 'highlight_value' in df.columns and 'hotelPreferences' in df.columns:
        if highlight_value:
            df['highlight_value'] = df['highlight_value'].str.lower().fillna('')
            df['highlight_value'] = df['highlight_value'].str.replace('[^\w\s]', '')
            df['highlight_value'] = df['highlight_value'].str.split()
            df['highlight_value'] = df['highlight_value'].apply(lambda x: set(x))
            df['hotelPreferences'] = df['hotelPreferences'].str.lower().fillna('')
            df['hotelPreferences'] = df['hotelPreferences'].str.replace('[^\w\s]', '')
            df['hotelPreferences'] = df['hotelPreferences'].str.split()
            df['hotelPreferences'] = df['hotelPreferences'].apply(lambda x: set(x))
            df['similarity'] = df.apply(lambda x: len(x['highlight_value'].intersection(x['hotelPreferences'])), axis=1)
            df = df.sort_values(by='similarity', ascending=False)
            df = df.drop(columns=['highlight_value', 'hotelPreferences', 'similarity'])
        else:
            df = df.drop(columns=['highlight_value', 'hotelPreferences'])
        top_30_hotels = df.head(30)
        return top_30_hotels
    else:
        return pd.DataFrame()  # Return an empty DataFrame if the required columns are not present




@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome Visitor!</h1>"

@app.route('/hotels', methods=['GET'])
def get_hotels():
    top_100_hotels = df.head(50)

    hotels_json = top_100_hotels.to_json(orient='records')

    hotels_dict = json.loads(hotels_json)

    return jsonify({"hotels": hotels_dict})

@app.route('/hotels/input', methods=['POST'])
def get_user_input():
    input_data = request.json
    if not input_data or 'highlight_value' not in input_data:
        return jsonify({'message': 'Please provide input data with the "highlight_value" field in JSON format'}), 400
    
    highlight_value = input_data['highlight_value']
    recommended_hotels = preprocess_data(df.copy(), highlight_value)
    
    if recommended_hotels.empty:
        return jsonify({'message': 'No hotels found for the given input'}), 404
    else:
        return jsonify({"hotels": recommended_hotels.to_dict(orient='records')}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
