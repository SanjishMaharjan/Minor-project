import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, redirect } from 'react-router-dom';
// import moment from 'moment'
import axios from 'axios';
import { convertToYDHMS } from "../../Utils/dateConverter"

const Questionpost = () => {

  // const currentDate = moment().format();
  // console.log(currentDate);

  // To change the toggle button of upvote and down vote
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [comments, setComments] = useState([]);
  // const commentId = useRef() // To get the comment id to map the comments


  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/question");
      console.log(response);
      setChat(response.data);
    } catch (error) {
      console.log(error)
    }

  };

  const deleteQuestion = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/question/${id}`);
      console.log(response);
      if (response.status == 200) redirect("/qa")
    } catch (error) {
      console.log(error)
    }

  };

  const reportQuestion = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/question/${id}/report`);
      console.log(response);
      if (response.status == 200) redirect("/qa")
    } catch (error) {
      console.log(error)
    }

  };

  // const getComment = async () => {

  //   // To get the comment id and hit comment api to fetch comment
  //   // console.log(commentId.current.getAttribute("value"));
  //   const value = commentId.current.getAttribute("value");
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/${value}/comment`);
  //     console.log(response.data);
  //     setComments(response.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const showComment = (e) => {
  //   getComment();
  // }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Questions
      </h1>

      {
        chat.map((talk) => {
          return (
            <>

              {/* To display the question */}
              <div key={talk.questioner.name} className="chat-message">
                <div className="message-sender" onClick={() => navigate("/profile")}>
                  <img className='chat-img' onClick={() => navigate("/profile")} src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg'></img>
                  <h3>{talk.questioner.name}</h3>
                  <h5>{convertToYDHMS(talk.createdAt)} ago</h5>
                </div>
                <div className="message-content">
                  {talk.question}

                </div>
                <div className="message-footer">
                  <i className={isActive ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"} onClick={toggleClass} style={{ fontSize: "0.8rem" }}> {talk.upvote.count} </i>

                  <Link to={`/QA/${talk._id}`}><i className="fa-solid fa-comment"></i></Link>
                  <i onClick={() => reportQuestion(talk._id)} className="fa-solid fa-font-awesome"></i>
                  <i class="fa-solid fa-pen-to-square"></i>
                  <span>
                    <i onClick={() => deleteQuestion(talk._id)} className="fa-solid fa-trash"></i>
                  </span>
                </div>
              </div>

            </>

          );
        })}

      {/* For comment on the paricular post*/}
      {
        comments.map((talk) => {
          return (
            <div className="chat-message">
              <div class="message-sender">
                <div class="message-content">
                  <i class="fa fa-reply" aria-hidden="true"></i><br />
                  {talk.answer}
                </div>
              </div>
            </div>

          );
        })
      }

    </div >
  )
}

export default Questionpost
