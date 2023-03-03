from pydantic import BaseModel,Field



class News_Out(BaseModel):
    id: str = Field(alias="_id")
    link:str
    image:str
    title:str
    description:str

    class Config:
        orm_mode = True