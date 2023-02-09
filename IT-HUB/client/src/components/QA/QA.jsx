import React, { useState, useEffect, useRef } from 'react'
import Questions from './Questions';

const QA = () => {

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

    console.log(commentId.current.getAttribute("value"));
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

      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Questions previously Asked
      </h1>

      {chat.map((talk) => {
        return (
          <div className="containeer">
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              Questioneer: {talk.questioner.name}<br />
              email: {talk.email}<br />
              createdAt: {talk.createdAt}<br />
              isReported: {talk.isReported}<br />
              upvote: {talk.upvote}<br />
              <a href="#" ref={commentId} value={talk._id} onClick={showComment}>Question: {talk.question}</a>
            </div>
          </div>

        );
      })}

      {comments.map((talk) => {
        return (
          <div className="containeer">
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              answer: {talk.answer}
            </div>
          </div>

        );
      })}
      <Questions />
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