# Import necessary libraries
import pandas as pd
from nltk.corpus import stopwords

from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer
from ast import literal_eval

# Load the dataset
# Assuming 'data' is your pandas DataFrame containing hotel data
# Replace this with your actual dataset loading code
data = pd.read_csv('data.csv')

# Data cleaning
# Assuming necessary cleaning has been done on the dataset beforehand

# Function to correct the format of hotel facilities column
def correction(string):
    try:
        # Attempt to evaluate the string as a list
        facilities_list = literal_eval(string)
        return facilities_list
    except (ValueError, SyntaxError):
        # If evaluation fails, handle the case where the string is not properly formatted
        # You can customize this part based on your specific data format
        return []

data['hotel_facilities'] = data['hotel_facilities'].apply(correction)




# Function to recommend hotels based on description, star rating, and guest recommendations
def recommend_hotel(description, star_rating, guest_recommendation):
    description = description.lower()
    description_tokens = word_tokenize(description)  # Corrected
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    filtered = {word for word in description_tokens if word not in stop_words}  # Corrected
    filtered_set = set()
    for fs in filtered:
        filtered_set.add(lemmatizer.lemmatize(fs))
    
    # Filter hotels based on star rating and guest recommendation
    filtered_hotels = data[(data['hotel_star_rating'] == star_rating) & (data['guest_recommendation'] >= guest_recommendation)]
    
    cos = []
    
    for i in range(filtered_hotels.shape[0]):
        temp_token = word_tokenize(filtered_hotels["hotel_description"][i])
        temp_set = {word for word in temp_token if word not in stop_words}
        temp2_set = set()
        for s in temp_set:
            temp2_set.add(lemmatizer.lemmatize(s))
        vector = temp2_set.intersection(filtered_set)
        cos.append(len(vector))
    
    filtered_hotels['similarity'] = cos
    filtered_hotels = filtered_hotels.sort_values(by='similarity', ascending=False)
    
    return filtered_hotels[["property_name", "hotel_star_rating", "guest_recommendation", "hotel_description"]].head(5)

# Function to run the hotel recommendation system
def run():
    description = input("Describe your ideal hotel:\t:")
    star_rating = int(input("Enter the desired star rating (1 to 5):\t:"))
    guest_recommendation = int(input("Enter the minimum guest recommendation count:\t:"))
    return recommend_hotel(description, star_rating, guest_recommendation)

# Execute the recommendation system
pd.set_option('display.max_colwidth', None)  # Display full text in DataFrame output
run()
