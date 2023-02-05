import React from 'react'
import './FAQStyles.css'
import { useState, useEffect } from 'react';

const FAQ = () => {

    // const [seen, setSeen] = useState("none");
    // setSeen(block);
    // // const showContent = () => {
    // //     if (seen === "none") {
    // //         setSeen("block");
    // //     }
    // //     else {
    // //         setSeen("none");
    // //     }
    // // };
    // useEffect(() => {
    // }, []);
    // const showContent = () => {
    //     { { } }
    // }


    return (
        <div>
            <h1 className='header-about'>FAQ</h1>
            <section className="faq-container">
                <div className="faq-one">
                    <h3 className='faq-page'>What is IT HUB ?</h3>
                    <div className="faq-body">
                        <p> IT Hub platform is dedicated to providing the latest information, resources, and support for students pursuing careers in Information Technology. Whether you are a beginner or an advanced learner, you will find valuable information to help you grow and succeed in your IT journey. Explore our vast library of articles, tutorials, and online courses to stay up-to-date with the latest developments in technology. Connect with like-minded individuals in our community and exchange ideas and insights. With IT Hub Student Website, your path to a successful career in IT starts here.</p>
                    </div>
                    <hr class="hr-line" />
                </div>
                <div className="faq-one">
                    <h3 className='faq-page'>What are the Objectives of IT HUB ?</h3>
                    <div className="faq-body">
                        <p> •	To provide the space for students to come together and learn about computer technology.
                            <br /> •	To increase connectivity between them by providing helpful resources.
                        </p>
                    </div>
                    <hr class="hr-line" />
                </div>
            </section >



        </div >


    )
}

export default FAQ
