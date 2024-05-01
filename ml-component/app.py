# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

import nltk
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('stopwords')
import numpy as np
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer
from ast import literal_eval

app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://localhost:5173'])

data = pd.read_csv("data.csv", on_bad_lines='skip')

columns_to_drop = ['additional_info', 'crawl_date', 'guest_recommendation', 'hotel_brand', 'pageurl', 'query_time_stamp', 'review_count_by_category', 'room_area', 'similar_hotel', 'site_review_rating', 'site_review_count', 'site_stay_review_rating', 'sitename']
data.drop(columns=columns_to_drop, axis=1, inplace=True)
# data.dropna(axis=0, how='any', inplace=True)
# Identify missing values
missing_values = data['hotel_facilities'].isnull()

# Remove rows with missing values
data = data[~missing_values]

# Replace incorrect values (if any)
# For example, if 'N/A' represents missing values, you can replace them with NaN
data.loc[data['hotel_facilities'] == 'N/A', 'hotel_facilities'] = np.nan

# Drop rows with incorrect values
data = data.dropna(subset=['hotel_facilities'])


def recommend_hotel(city, facilities, rating_threshold=0.5):
    # Rename duplicate columns
    facilities = facilities.lower().split('|')
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    filtered_set = {lemmatizer.lemmatize(word) for word in facilities if word not in stop_words}
    
    country = data[data['city'].str.lower() == city.lower()]
    country = country.set_index(np.arange(country.shape[0]))
    cos = []
    
    for i in range(country.shape[0]):
        temp_token = word_tokenize(country["hotel_facilities"][i])
        temp_set = {word for word in temp_token if word not in stop_words}
        temp2_set = set()
        for s in temp_set:
            temp2_set.add(lemmatizer.lemmatize(s))
        vector = temp2_set.intersection(filtered_set)
        cos.append(len(vector))
    country['similarity'] = cos
    
    # Calculate rating similarity
    min_rating = country['hotel_star_rating'].min()
    max_rating = country['hotel_star_rating'].max()
    country['rating_similarity'] = (country['hotel_star_rating'] - min_rating) / (max_rating - min_rating)
    
    # Calculate overall similarity (considering both facilities and rating)
    country['overall_similarity'] = (cos + country['rating_similarity']) / 2
    
    country = country.sort_values(by='overall_similarity', ascending=False)
    country.reset_index(inplace=True)
    
    # Calculate accuracy match
    max_similarity = country['overall_similarity'].max()
    country['accuracy_match'] = country['overall_similarity'] / max_similarity
    
    return country[["city","rate_perNight","uniq_id","hotel_star_rating","hotel_category","hotel_description","img_url","hotel_facilities", "hotel_star_rating","latitude","longitude", "property_name", "accuracy_match"]].head(100)
   

@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome Visitor!</h1>"

@app.route('/hotels', methods=['GET'])
def get_hotels():
    top_100_hotels = data.head(100)

    hotels_json = top_100_hotels.to_json(orient='records')

    hotels_dict = json.loads(hotels_json)

    return jsonify({"hotels": hotels_dict})

@app.route('/hotels/input', methods=['POST'])
def get_user_input():
    input_data = request.json
    print("Recevied input data:",input_data)
    if not input_data or 'city' not in input_data or 'facilities' not in input_data:
        return jsonify({'message': 'Please provide input data with the "city" and "facilities" fields in JSON format'}), 400
    
    city = input_data['city']
    facilities = input_data['facilities']
    recommended_hotels = recommend_hotel(city, facilities)
    if recommended_hotels.empty:
        return jsonify({'message': 'No hotels found for the given input'}), 404
    else:
        return jsonify({"hotels": recommended_hotels.to_dict(orient='records')}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
