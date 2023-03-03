from pydantic import BaseModel,Field



class Course_Out(BaseModel):
    id: str = Field(alias="_id")
    course_name:str
    Difficulty_level:str
    course_rating:str
    course_url:str
    course_description:str

    class Config:
        orm_mode = True