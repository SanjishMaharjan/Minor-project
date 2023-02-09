import React, { useState } from 'react';
import "./QAStyles.css"
import StudentProfile from '../StudentProfile/StudentProfile';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook to navigate to desired route inside image

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: newQuestion }),
        });
        const data = await response.json();
        setQuestions([...questions, data.question]);
        setNewQuestion('');
    }

    return (
        <div>
            {/* <h1>Post Your Question</h1> */}
            <div className='question-bar'>
                <img className='chat-img' onClick={() => navigate("/profile")} src='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg'></img>
                <form onSubmit={handleSubmit}>
                    <input className='post-question' type="text" placeholder='Post Your Question' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    <button style={{ marginLeft: "1rem" }} type="submit">Post</button>
                </form>
            </div>
            <h2>Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    )
}

export default Questions;
