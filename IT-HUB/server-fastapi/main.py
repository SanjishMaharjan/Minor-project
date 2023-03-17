from fastapi import FastAPI
from routes.course import course
from routes.news import news
from decouple import config
import uvicorn
import os

CLIENT_URL = os.getenv("CLIENT_URL",config("CLIENT_URL"))



from fastapi.middleware.cors import CORSMiddleware

origins = [
    CLIENT_URL, 
    "https://www.lec-ithub.tech",
    "https://lec-ithub.tech",
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(course)
app.include_router(news)

PORT = os.getenv("PORT",8000)


if __name__ == "__main__":
    config = uvicorn.Config("main:app", port=PORT, reload=True)
    server = uvicorn.Server(config)
    server.run()
