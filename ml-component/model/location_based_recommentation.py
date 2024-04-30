# -*- coding: utf-8 -*-
import matplotlib
import matplotlib.gridspec as gridspec
import warnings
warnings.filterwarnings('ignore')
import geopy as gp

from geopy.geocoders import Nominatim
from geopy.point import Point


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from plotly.offline import init_notebook_mode, iplot
import plotly.subplots as sp



df=pd.read_csv("makemytrip_com-travel_sample.csv",on_bad_lines='skip')
df

print("Shape of the dataframe",df.shape)
print("duplicated Value count",df.duplicated().sum())
analys = pd.DataFrame({
    'Unique':df.nunique(),
    'Null':df.isnull().sum(),

    'NullPercent':df.isna().sum() / len(df),
    'Type':df.dtypes.values

})
#display(analys)
print(analys)

"""lets drop some unwanted columns"""

df.drop(['in_your_room', 'is_value_plus',"pageurl","query_time_stamp","image_urls","qts","site_review_count"], axis=1, inplace=True)

df.columns

"""so what we need is address and ratings..let's drop some other columns"""

df.drop(['crawl_date', 'highlight_value',"hotel_overview","mmt_holidayiq_review_count",'sitename', 'state',"mmt_review_rating"], axis=1, inplace=True)

df["traveller_rating"].value_counts().sort_values()

df

"""### processing ratings"""

df.hotel_star_rating.value_counts()

df['hotel_star_rating']=df['hotel_star_rating'].replace('1 star',1).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('2 star',2).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('3 star',3).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('4 star',4).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('5 star',5).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('Four star',4).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('Three on 5',3).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('Four on 5',4).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].replace('Five on 5',5).astype(str)
df['hotel_star_rating']=df['hotel_star_rating'].fillna(0).astype(str)

df.hotel_star_rating.value_counts()

df['site_review_rating']=df['site_review_rating'].fillna(0).astype(str)

df.site_review_rating.value_counts()

df["traveller_rating"]=df.traveller_rating.fillna(0)

"""Let's fill Nan values in country to India"""

df["country"]=df.property_type.fillna("India")

"""Let's fill Nan values in area to City that is located"""

df["area"]=df.area.fillna(df["city"])

"""Let's fill Nan values in property to Hotel"""

df["property_type"]=df.property_type.fillna("Hotel")

df["room_types"]=df.property_type.fillna("Standard Room")

df.replace('..', np.NaN, inplace=True)
df.replace('', np.NaN, inplace=True)

df

print("Shape of the dataframe",df.shape)
print("duplicated Value count",df.duplicated().sum())
null = pd.DataFrame({

    'Null':df.isnull().sum(),

    'NullPercent':df.isna().sum() / len(df),


})
display(null)

df.loc[df["property_address"].isnull()]

"""we can't get location details with these columns. so let's drop."""

df = df.loc[~df['property_address'].isnull()]
i=np.arange(1,(len(df["uniq_id"]))+1)
df.set_index(i,inplace=True)
df

df["property_type"]=df.property_type.fillna("Hotel")

"""### traveller_rating Formatting"""

df["traveller_rating"]=df["traveller_rating"].astype(str)

df["traveller_rating"].isnull().sum()

df1 = df[~df["traveller_rating"].str.contains('Location')]
df1

df1["Location"]=df1["traveller_rating"]
df1["Hospitality"]=df1["traveller_rating"]
df1["Facilities"]=df1["traveller_rating"]
df1["Cleanliness"]=df1["traveller_rating"]
df1["Value for Money"]=df1["traveller_rating"]
df1["Food"]=df1["traveller_rating"]

df1

df1["Location"].value_counts()

df2 = df[df["traveller_rating"].str.contains('Location')]
df2

df2[["Location", "Hospitality", "Facilities", "Cleanliness", "Value for Money", "Food"]] = df2["traveller_rating"].str.split("|", expand=True)

c=["Location","Hospitality","Facilities", "Cleanliness","Value for Money","Food"]
for i, cn in enumerate(df2[c]):
    df2[cn].replace((cn)+":",'',regex=True,inplace=True)
    df2[cn].replace("/5",'',regex=True,inplace=True)

df2

df2["Location"].value_counts()

data = pd.concat([df1, df2]).sort_index()
data

data.Location.value_counts()

"""Now we have traveller rating seperated"""

print("Shape of the dataframe",data.shape)
print("duplicated Value count",data.duplicated().sum())
null = pd.DataFrame({

    'Null':data.isnull().sum(),

    'NullPercent':data.isna().sum() / len(data),


})
display(null)

"""now we have Null values only in MMt columns"""

data[["mmt_location_rating","mmt_review_count","mmt_review_score", "mmt_traveller_type_review_count",  "mmt_tripadvisor_count"]]=data[["mmt_location_rating","mmt_review_count","mmt_review_score", "mmt_traveller_type_review_count","mmt_tripadvisor_count"]].fillna(0)

"""
<h1 style="background-color:yellow;text-align: center">3.Exploratory Data Analysis & Data Visualisation</h1>"""

fig, ax = plt.subplots(figsize=(12,10))
sns.countplot(data['hotel_star_rating'], ax=ax)
plt.title('Review Stars Countplot')
plt.savefig('stars.png')
plt.show()

c=["Location","Hospitality","Facilities", "Cleanliness","Value for Money","Food"]
for i, cn in enumerate(data[c]):
    data[cn]=data[cn].astype(float)
    rate = (data[data[cn]!=0][cn].value_counts())
    fig, ax = plt.subplots(figsize=(12,10))
    sns.countplot(y=rate)
    plt.title( cn+" "+'Countplot')
    #plt.savefig('stars.png')
    plt.show()



"""## plot the map"""

fig = px.scatter_geo(data, lon=data["longitude"],lat=data["latitude"], scope="asia",

                     color=data["hotel_star_rating"],hover_name="property_name"
                     )
fig.show()

NewDelhiAndNCR= data[data.city == 'NewDelhiAndNCR']

fig = px.scatter_geo(NewDelhiAndNCR, lat="latitude", lon="longitude",
                    size_max=15, color=NewDelhiAndNCR["hotel_star_rating"],
                    hover_name="property_name")

fig.show()

"""Let's drop some lagging Data"""

NewDelhiAndNCR=NewDelhiAndNCR[NewDelhiAndNCR.latitude != 0]
NewDelhiAndNCR

"""## Swap some column Values"""

#latitude and longitude values swapped in this row
NewDelhiAndNCR[NewDelhiAndNCR["latitude"]>70]

m = NewDelhiAndNCR["latitude"]>70

NewDelhiAndNCR.loc[m, ['latitude', 'longitude']] = (
    NewDelhiAndNCR.loc[m, ['longitude', 'latitude']].values)
NewDelhiAndNCR[NewDelhiAndNCR["uniq_id"]=="e39c71ac40a8f119855e63459384ee2c"]

NewDelhiAndNCR[NewDelhiAndNCR["uniq_id"]=="e39c71ac40a8f119855e63459384ee2c"]

"""## Cleaned Data plot"""

fig =px.scatter_geo(NewDelhiAndNCR, lat="latitude", lon="longitude",
                   size_max=15,color=NewDelhiAndNCR["hotel_star_rating"],hover_name="property_name" )

fig.show()

"""Let's go for Clustering

<h2 style="background-color:DodgerBlue;text-align: center">Hotels in NewDelhiAndNCR</h2>
"""

import geopandas as gpd

gdf = gpd.GeoDataFrame(
    NewDelhiAndNCR, geometry=gpd.points_from_xy(x=NewDelhiAndNCR.longitude, y=NewDelhiAndNCR.latitude)
)
gdf

# initialize an axis
fig, ax = plt.subplots(figsize=(8,6))
countries = gpd.read_file(
               gpd.datasets.get_path("naturalearth_lowres"))
countries[countries["name"] == "India"].plot(color="black",ax=ax)
NewDelhiAndNCR.plot(x="longitude", y="latitude", kind="scatter",
        c="red", marker="s",
        title=f"hotels in NewDelhiAndNCR",
        ax=ax)
# add grid
ax.grid(True, alpha=0.5)
plt.show()

"""<h1 style="background-color:yellow;text-align: center">4.Clustering</h1>

### K-Means Clustering
"""

from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

import geopandas as gpd

NewDelhiAndNCR=NewDelhiAndNCR.dropna()

# Elbow method to determine the number of K in Kmeans Clustering
coords = NewDelhiAndNCR[['longitude','latitude']]

distortions = []
K = range(1,25)
for k in K:
    kmeansModel = KMeans(n_clusters=k)
    kmeansModel = kmeansModel.fit(coords)
    distortions.append(kmeansModel.inertia_)

fig, ax = plt.subplots(figsize=(12, 8))
plt.plot(K, distortions, marker='o')
plt.xlabel('k')
plt.ylabel('Distortions')
plt.title('Elbow Method For Optimal k')
plt.savefig('elbow.png')
plt.show()

from sklearn.metrics import silhouette_score

sil = []
kmax = 50

# dissimilarity would not be defined for a single cluster, thus, minimum number of clusters should be 2
for k in range(2, kmax+1):
    kmeans = KMeans(n_clusters = k).fit(coords)
    labels = kmeans.labels_
    sil.append(silhouette_score(coords, labels, metric = 'euclidean'))

for i in [2,3,4,5,6]:
    '''
    Create KMeans instance for different number of clusters
    '''
    kmeans = KMeans(n_clusters=i,init='k-means++')
    kmeans.fit(coords)

    y = kmeans.labels_
    print(f"k ={i} slhouette_score ", silhouette_score(coords, y, metric='euclidean'))

kmeans = KMeans(n_clusters=5, init='k-means++')
kmeans.fit(coords)
y = kmeans.labels_
print("k = 4", " silhouette_score ", silhouette_score(coords, y, metric='euclidean'))

"""<h1 style="background-color:yellow;text-align: center">5.Visualizing Cluster</h1>

"""

NewDelhiAndNCR['cluster'] = kmeans.predict(NewDelhiAndNCR[['longitude','latitude']])
i=np.arange(0,(len(NewDelhiAndNCR["uniq_id"])))
NewDelhiAndNCR.set_index(i,inplace=True)
NewDelhiAndNCR.head()

NewDelhiAndNCR['cluster'].value_counts()

px.scatter_geo(NewDelhiAndNCR, lat="latitude", lon="longitude",color=NewDelhiAndNCR["cluster"])

import folium
from branca.element import Figure

# Assuming 'latitude' and 'longitude' columns exist in NewDelhiAndNCR

geo_df_list = [[row['longitude'], row['latitude']] for index, row in NewDelhiAndNCR.iterrows()]

# Further processing or visualization using the list of coordinates (geo_df_list)

# Example Folium visualization (assuming you have Folium installed)
m = folium.Map(location=[NewDelhiAndNCR['latitude'].iloc[0], NewDelhiAndNCR['longitude'].iloc[0]], zoom_start=12)

for coordinates in geo_df_list:
    folium.Marker(location=coordinates, popup="Hotel").add_to(m)

m

geo_df_list

fig=Figure(width=550,height=350)
m3=folium.Map(location=[28.644800, 77.216721],tiles='cartodbpositron',zoom_start=11,min_zoom=8,max_zoom=14)

i=0
for coordinates in geo_df_list:

    if NewDelhiAndNCR["cluster"][i] == 0:
        type_color = "green"
    elif NewDelhiAndNCR["cluster"][i] == 1:
        type_color = "blue"
    elif NewDelhiAndNCR["cluster"][i] == 2:
        type_color = "orange"
    elif NewDelhiAndNCR["cluster"][i] == 3:
        type_color = "pink"
    else:
        type_color = "purple"
    m3.add_child(
        folium.Marker(
            location=coordinates,popup=NewDelhiAndNCR["property_name"][i],icon=folium.Icon(color="%s" % type_color),))
    i = i + 1



m3

m3.save("Newdelhi.png")

NewDelhiAndNCR.columns

"""## Hotel Recommendations"""

top_restaurants_Newdelhi = NewDelhiAndNCR.sort_values(by=['mmt_review_count', 'hotel_star_rating'], ascending=False)
top_restaurants_Newdelhi.head()

"""
<h1 style="background-color:yellow;text-align: center">6. User Recommentations</h1>"""

def recommend_restaurants(df, longitude, latitude):
    # Predict the cluster for longitude and latitude provided
    cluster = kmeans.predict(np.array([longitude,latitude]).reshape(1,-1))[0]
    print(cluster)

    # Get the best restaurant in this cluster
    return  df[df['cluster']==cluster].iloc[0:5][['property_name', 'latitude','longitude']]

#checking function
recommend_restaurants(top_restaurants_Newdelhi,77.1200,28.55200  )

"""### Getting data from user"""

latitude=float(input ("Enter latitude: "))
longitude=float(input ("Enter longitude: "))
Hotel=recommend_restaurants(top_restaurants_Newdelhi,longitude, latitude  )
i=np.arange(0,5)
Hotel.set_index(i,inplace=True)

Hotel

Hotel_data=Hotel.copy()

Hotel_data=Hotel_data.drop(["property_name"],axis=1)
Hotel_data

dataList = [] #empty list
for index, row in Hotel_data.iterrows():
    mylist = [row.latitude, row.longitude]
    dataList.append(mylist)

dataList

"""### Plotting the Data"""

px.scatter_geo(Hotel, lat="latitude", lon="longitude",hover_name=Hotel["property_name"],scope="asia")

m1=folium.Map(location=[28.644800, 77.216721],tiles='cartodbpositron',zoom_start=11,min_zoom=8,max_zoom=14)
i=0
for coordinates in dataList:

    m1.add_child(
        folium.Marker(
            location=dataList[i],popup=Hotel["property_name"][i],icon=folium.Icon(color="Pink")))
    i = i + 1



m1

"""END!!!"""

