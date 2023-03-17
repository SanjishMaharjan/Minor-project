from fastapi import APIRouter,HTTPException
from config.db import News
from models.news_model import News_Out
from typing import List

news= APIRouter()




@news.get("/news/pages/{id}")
async def get_course(id:int)->List[News_Out]:
   if id<=0:
      id=1
   
   try:
        page_size=20
        n= (id-1)*page_size
        news = list( News.find({}).skip(n).limit(page_size))

        news=[{**i,"_id":str(i.get('_id'))} for i in news]
        return news
   except Exception as e:
      raise HTTPException(status_code=404,detail=str(e))