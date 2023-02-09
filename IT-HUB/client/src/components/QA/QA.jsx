import React, { useState, useEffect, useRef } from 'react'
import Questions from './Questions';
import { useNavigate } from 'react-router-dom';
// import moment from 'moment'

const QA = () => {

  // const currentDate = moment().format();
  // console.log(currentDate);
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [comments, setComments] = useState([]);

  const commentId = useRef() // To get the comment id to map the comments
  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/question");
      const data = await response.json();
      console.log(data);
      setChat(data);
    } catch (error) {
      console.log(error)
    }

  };

  const getComment = async () => {

    // To get the comment id and hit comment api to fetch comment
    // console.log(commentId.current.getAttribute("value"));
    const value = commentId.current.getAttribute("value");
    try {
      const response = await fetch(`http://localhost:5000/api/${value}/comment`);
      const data = await response.json();
      console.log(data);
      setComments(data);
    } catch (error) {
      console.log(error)
    }
  }
  const showComment = (e) => {
    getComment();
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Questions />
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Questions
      </h1>

      {chat.map((talk) => {
        return (
          <>

            {/* To display the question */}
            <div class="chat-message">
              <div class="message-sender">
                <img className='chat-img' onClick={() => navigate("/profile")} src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg'></img>
                <h3>{talk.questioner.name}</h3>
                <h6 style={{ marginLeft: "34rem" }}>{talk.createdAt}</h6>
              </div>
              <div class="message-content">
                <a href="#" ref={commentId} value={talk._id} onClick={showComment}>{talk.question}</a>
              </div>
              <div class="message-footer">
                <i class="fa-solid fa-angle-up" style={{ fontSize: "0.8rem" }}> upvote [ {talk.upvote} ]</i>
                <i class="fa-solid fa-angle-down" style={{ fontSize: "0.8rem" }}>downvote</i>
                <i class="fa-solid fa-comment" ref={commentId} value={talk._id} onClick={showComment}></i>
                <i class="fa-solid fa-font-awesome"></i>

                {/* <button>Like</button> */}
                {/* <button>Comment</button> */}
                {/* <button>report</button> */}
              </div>
            </div>

            {/* email: {talk.questioner.email}<br />
                          createdAt: {talk.createdAt}<br />
                          isReported: {talk.isReported}<br />
                          upvote: {talk.upvote}<br /> */}
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

export default QA

// comments
// :
// [{…}]
// createdAt
// :
// "2023-02-03T05:51:42.438Z"
// isReported
// :
// true
// question
// :
// "how is rabi"
// questioner
// :
// {_id: '63dbd9834e86c518c4414dd3', name: 'Admin Rabi', email: 'rabindra.adhikari@lec.edu.np'}
// tag
// :
// []
// updatedAt
// :
// "2023-02-03T05:57:11.228Z"
// upvote
// :
// 0
// __v
// :
// 1
// _id
// :
// "63dca0ee772afaf3da3c9298"
// [[Prototype]]
// :
// Object