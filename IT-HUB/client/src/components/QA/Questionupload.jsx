import React, { useState } from 'react';
import "./QAStyles.css"
import { useNavigate, redirect } from 'react-router-dom';
import axios from "axios";

const Questionupload = () => {
    const [question, setQuestions] = useState();
    // const [newQuestion, setNewQuestion] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook to navigate to desired route inside image

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:5000/api/question', { question: question });
        console.log(data);
        return redirect("/qa");
    }

    return (
        <div>
            {/* <h1>Post Your Question</h1> */}
            {/* It is the question bar to post questions */}
            <div className='question-bar'>
                <img className='question-img' onClick={() => navigate("/profile")} src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg'></img>
                <form onSubmit={handleSubmit}>
                    <input className='post-question' type="text" placeholder='Post Your Question' value={question} onChange={(e) => setQuestions(e.target.value)} />
                    <button className='post-question-button' type="submit">Post</button>
                </form>
            </div>

        </div>
    )
}

export default Questionupload;
