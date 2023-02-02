import React from 'react'
import { useState, useEffect } from "react";
import news from "./news.json"
import './NewsStyles.css'

const News = () => {

  // Fetch from api
  // const [description, setDescription] = useState([]);
  // const getdata = async () => {
  //   url = "./news.json"
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   setDescription(data);
  // };

  // useEffect(() => {
  //   getdata();
  // }, []);

  return (
    <div className='wrapper'>
      {news.map((item) => {
        return (

          <div className="card">
            <div className="card_body">
              <img className="card_image" src={item.image} alt="" />
              <h2 className="card_title">{item.title}</h2>
              {/* <p className="card__descript">{props.descript}</p> */}
            </div>
            <a href={item.href}><button className="card_btn" type="button">Read more</button></a>
          </div>

        );
      })}

    </div>



  )
}

// const card = (props) => {
//   return (

//     <div className="card">
//       <div className="card_body">
//         <img src={props.img} alt="" srcset="" />
//         <h2 className="card_title">{props.title}</h2>
//         <p className="card__descript">{props.descript}</p>
//       </div>
//       <button className="card__btn">Read more</button>
//     </div>


//   )
// }
export default News
