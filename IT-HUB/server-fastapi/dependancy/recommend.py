import pickle
import numpy as np
import pandas as pd
import os



model_path=os.getcwd()+"/dependancy/model.pkl"
course_path=os.getcwd()+"/dependancy/courses.pkl"


def recommended(text:str,n):

    cs=pickle.load(open(model_path,"rb"))
    course=pickle.load(open(course_path,"rb"))
    index=course[course["Course Name"]==text].index[0]
    angle=cs[index]
    course_list=sorted(list(enumerate( angle)),reverse=True,key=lambda x:x[1])[1:n]

    return np.array(course_list,dtype=np.int16)[:,0]


def get_recommended_course(user):
    # pass
    intrested_course=user.get("interested_course",[])
    array=[]
    for i in intrested_course:
        array.append(recommended(i.lower(),10))
    
    array = np.array(array)
    array=array.reshape(-1,)
    if array.shape[0]>40:
        array=array[np.random.choice(len(array), size=40, replace=False)]
    return array.tolist()





