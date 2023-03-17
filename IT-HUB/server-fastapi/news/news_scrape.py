import random
from pymongo import MongoClient
from decouple import config
import os

from developers_redhat import scrape_from_developers_redhat
from mojo_auth import scrape_from_mojo_auth
from dzone import scrape_from_dzone
from stackoverflow_blog import scrape_from_stack_overflow
from make_use_of import scrape_from_make_use_of
from simplilearn import scrape_from_simplilearn
from new_stack import scrape_from_news_stack
# from medium import scrape_from_medium


# Connect to the MongoDB server


mongoURI = os.getenv("MONGO_URI")
client = MongoClient(mongoURI)
db = client["discussion"]
News = db['news']


news=[]

news.extend(scrape_from_make_use_of())
news.extend(scrape_from_dzone())
news.extend(scrape_from_news_stack())
news.extend(scrape_from_stack_overflow())
news.extend(scrape_from_mojo_auth())
news.extend(scrape_from_developers_redhat())
news.extend(scrape_from_simplilearn())


# randomize the news
random.shuffle(news)


News.delete_many({})
print("deleted news from database")


News.insert_many(news)
print("uploaded to database")




# data
