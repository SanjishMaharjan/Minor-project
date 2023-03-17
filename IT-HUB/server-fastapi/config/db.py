from pymongo import MongoClient
from decouple import config
import os


mongoURI= os.getenv("MONGO_URI",config("MONGO_URI"))

client = MongoClient(mongoURI)

# Connect to the MongoDB server
db = client["discussion"]
User = db["users"]

Course = db["courses"]
News = db['news']


