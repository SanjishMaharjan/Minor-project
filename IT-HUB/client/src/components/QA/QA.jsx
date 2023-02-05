import React, { useState, useEffect } from 'react'

const QA = () => {

  const [chat, setChat] = useState([]);

  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/question/63dca0ee772afaf3da3c9298/report");
      const data = await response.json();
      console.log(data);
      setChat(data);
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      Q/A
      {/* {chat} */}
      {/* {data} */}
      {chat.map((talk) => {
        return (
          <div>
            {talk.question}
            {/* {talk.createdAt}
            {talk.question} */}
          </div>

        );
      })}
    </div>

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