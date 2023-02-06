import React, { useState } from 'react';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

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
            <h1>Post Your Question</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Ask Something' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
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
