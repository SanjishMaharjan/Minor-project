from fastapi import APIRouter,HTTPException,Depends
from config.db import User,Course
from dependancy.recommend import get_recommended_course
from models.course_model import Course_Out
from dependancy.user_dependancy import get_user,logged_in
import random
from pydantic import Field



course = APIRouter(
     prefix="/course",
    dependencies=[Depends(logged_in)],
)




@course.get("/all")
async def get_course()->list[Course_Out]:
   try:
      rand=random.randint(0,3523)
      course = list( Course.find({}).limit(20).skip(rand))
      course=[{**i,"_id":str(i.get('_id'))} for i in course]
      return course
   except Exception as e:
      raise HTTPException(status_code=404,detail=str(e))


@course.get("/search/")
async def get_course(search:str,user: User = Depends(get_user))->list[Course_Out]:
   try:
      if(not search):
         raise HTTPException("cannot search empty items")

      search=search.split("+")
      search=" ".join(search)
      course =list( Course.find({"course_name": {"$regex": search, "$options": "i"}}).limit(25))

      n=random.randint(1,5)
      if(len(course)>=5):
         c=course[n]
         c_name=c.get('course_name')
         print(c_name)
         try:
            interested_course = user.get('interested_course', [])

            if c_name not in interested_course:
               interested_course.append(c_name)

            if len(interested_course) > 5:
               interested_course.pop(0)
   
            User.update_one({'_id': user['_id']}, {'$set': {'interested_course': interested_course}})
  
         except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))         

      



      # if not found search individual words and join the list
      if( len(course)<=5):
         courses=[]
         search=search.split(" ")
         for i in search:
            course=Course.find({"course_name": {"$regex": i, "$options": "i"}}).limit(10)
            courses.extend(list(course))      
         courses=[{**i,"_id":str(i.get('_id'))} for i in courses]
         return courses
      course=[{**i,"_id":str(i.get('_id'))} for i in course]
      return course
   except Exception as e:
      raise HTTPException(status_code=404,detail=str(e))




@course.get("/pages/{id}")
async def get_course(id:int=Field(le=50))->list[Course_Out]:
   try:
      size=12
      page=(id-1)*size
      course = list( Course.find({}).limit(size).skip(page))
      course=[{**i,"_id":str(i.get('_id'))} for i in course]
      return course
   except Exception as e:
      raise HTTPException(status_code=404,detail=str(e))

@course.get("/recommend")
async def get_course(user:User=Depends(get_user))->list[Course_Out]:
   try:
      course = get_recommended_course(user)
      course = list( Course.find({"index":{ "$in":course}}))
      course=[{**i,"_id":str(i.get('_id'))} for i in course]
      return course
   except Exception as e:
      raise HTTPException(status_code=404,detail=str(e))
       



@course.post("/{c_name}")
def recomend(c_name: str, user: User = Depends(get_user)):
   try:
      interested_course = user.get('interested_course', [])

      if c_name not in interested_course:
         interested_course.append(c_name)

      if len(interested_course) > 5:
         interested_course.pop(0)
   
      User.update_one({'_id': user['_id']}, {'$set': {'interested_course': interested_course}})
  
   except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

