import React, { useState } from 'react';
import "./FAQStyles.css"
const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    const questions = [
        {
            question: 'What is IT HUB ?',
            answer: 'IT Hub platform is dedicated to providing the latest information, resources, and support for students pursuing careers in Information Technology. Whether you are a beginner or an advanced learner, you will find valuable information to help you grow and succeed in your IT journey. Explore our vast library of articles, tutorials, and online courses to stay up-to-date with the latest developments in technology. Connect with like-minded individuals in our community and exchange ideas and insights. With IT Hub Student Website, your path to a successful career in IT starts here.',
        },
        {
            question: 'What are the Objectives of IT HUB ?',
            answer: 'To provide the space for students to come together and learn about computer technology and increase connectivity between them by providing helpful resources.',
        },
        {
            question: 'How do I get started with IT HUB?',
            answer: 'You can start learning Programming concepts by joining discussion portal and browsing tutorials, and joining events.',
        },
    ];

    return (
        <div>
            <h2 className='header-about'>FAQ</h2>
            <section className="faq-container">
                {questions.map((question, index) => (
                    <div key={index}>
                        <h3 className='faq-page' onClick={() => handleClick(index)}>{question.question}</h3>
                        {activeIndex === index && (
                            <p className="faq-body">{question.answer}</p>
                        )}
                    </div>
                ))
                }
            </section>
        </div >
    );
}

export default FAQ;
