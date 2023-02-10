import React from 'react'
import axios from 'axios'
import { useState, useNavigate } from 'react'

const Comment = () => {

    const [comment, setComment] = useState();
    const navigate = useNavigate(); // Using useNavigate hook to navigate to desired route inside image

    const getUserId = async (e) => {
        e.preventDefault();
        const data = await axios.get('http://localhost:5000/api/');
        console.log(data);
    }
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:5000/api/63e527b84ed21750d7587312/comment', { comment: comment });
        console.log(data);
    }

    return (
        <div>
            {/* <h1>Post Your Question</h1> */}
            {/* It is the question bar to comments on questions */}
            <div className='question-bar'>
                <img className='question-img' onClick={() => navigate("/profile")} src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg'></img>
                <form onSubmit={handleSubmitComment}>
                    <input className='post-question' type="text" placeholder='Comment your thoughts' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button style={{ marginLeft: "1rem" }} type="submit">Post</button>
                </form>
            </div>

            {/*     
            // To test the posted question's output         
            <h2 style={{ textAlign: "center" }}>Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul> */}

        </div>
    )
}

export default Comment
