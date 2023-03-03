from pymongo import MongoClient
from decouple import config

mongoURI=config("mongoURI")

client = MongoClient(mongoURI)

# Connect to the MongoDB server
db = client["discussion"]
User = db["users"]

Course = db["courses"]
News = db['news']


