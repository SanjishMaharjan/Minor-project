import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'



const Comment = () => {

    const [comment, setComment] = useState([]);
    const params = useParams();
    const id = params.id;


    const getComment = async (e) => {
        // e.preventDefault();
        const response = await axios.get(`http://localhost:5000/api/${id}/comment`);
        console.log(response.data);
        setComment(response.data)
    }

    useEffect(() => {
        getComment();
    }, [id])

    return (
        <div>
            {/* <h1>Post Your Question</h1> */}
            {/* It is the question bar to comments on questions */}

            {comment.map((c) => {
                return (
                    <>
                        <div className="chat-message">
                            <div className="message-content">
                                <div className="message-sender">
                                    {c.answer}
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}











            {/* <div className='question-bar'>
                <img className='question-img' onClick={() => navigate("/profile")} src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg'></img>
                <form onSubmit={handleSubmitComment}>
                    <input className='post-question' type="text" placeholder='Comment your thoughts' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button style={{ marginLeft: "1rem" }} type="submit">Post</button>
                </form>
            </div> */}


        </div>
    )
}

export default Comment
