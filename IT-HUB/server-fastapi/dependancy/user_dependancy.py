from fastapi import Cookie,HTTPException
import jwt
from decouple import config
from config.db import User
from bson import ObjectId
import os



jwt_secret= os.getenv("JWT_SECRET",config("JWT_SECRET"))


async def get_user(token: str = Cookie(default=None)):
    token=jwt.decode(token,jwt_secret,algorithms='HS256')
    print(token)
    id=ObjectId(token.get("id"))            
    user=User.find_one({"_id":id})         
    return user
    

async def logged_in(token: str = Cookie(default=None)):
    try:
        if(token):
            token=jwt.decode(token,jwt_secret,algorithms='HS256')
            id=ObjectId(token.get("id"))            
            try:
                User.find_one({"_id":id}) 
                return 
            except Exception as e:
               raise HTTPException(status_code=401,detail=str(e))
        else:
           raise HTTPException(status_code=401,detail="not logged in")
    except Exception as e:
        raise HTTPException(status_code=401,detail="not logged in")