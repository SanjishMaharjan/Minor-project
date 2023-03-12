import React, { useState } from 'react';
import Candidate from './Canditate';
import "./poll.scss"
import { MdOutlinePoll } from "react-icons/md"

const candidates = [
    {
        name: "Sumite Beshar",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/324557162_905907147407638_6074464728544780460_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ad2b24&_nc_ohc=cmSAwLcw4zwAX_RHEX3&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCZSXJQ5KWergGw9x1YYa55Rxn2cUE1ddvjLe0i7ofQRw&oe=6411C03F",
        vote: "10",
    },
    {
        name: "Rabi D Tiger",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/16708372_1813804955540335_377798962417783442_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=JQ39_eKQPB4AX-TKRKM&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCWMtJNouEd6T6h2YCarNAOWzxsyAugmMqUJ-3CtAfgbQ&oe=6433F4B5",
        vote: "20",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },
    {
        name: "Sushil Kafle",
        photo: "https://scontent.fktm17-1.fna.fbcdn.net/v/t1.18169-9/14915520_1788469334742092_2896072621343324870_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=TO6shkHT9XwAX-beqHG&_nc_ht=scontent.fktm17-1.fna&oh=00_AfCBgVCPoUjtfY4vSLrWWEer0kemC6B1duekVO-QH27-8w&oe=6434076C",
        vote: "30",
    },

];
const Poll = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("show");

    const handlePopupClick = () => {
        setShowPopup(!showPopup);
        if (text === "show") setText("hide")
        else setText("show");
        console.log("clicked");
    };


    return (
        <div className='poll-container' >
            <h2>Title: Following is the Election for Sexiest person of our group</h2>
            <button style={{ marginTop: "2rem" }} onClick={handlePopupClick} >{text}</button>
            <div className={`popup ${showPopup ? "show" : ""}`}>
                <div className="poll">
                    <h2>{MdOutlinePoll}Vote for your favorite candidate!</h2>
                    {/* <div className="candidates">
                        {candidates.map((candidate, index) => (
                            <Candidate
                                key={index}
                                name={candidate.name}
                                photo={candidate.photo}
                                onClick={() => handleVote()}
                            />
                        ))}
                    </div> */}
                    <h3>Results:</h3>
                    <ul className="results">
                        {candidates.map((candidate, index) => (
                            <li key={index}>
                                <span>
                                    <img className='thumb-img' src={candidate.photo} />
                                    {candidate.name}: {candidate.vote} votes
                                    <div className="bar">
                                        <div
                                            className="fill"
                                            style={{ width: `${candidate.vote}%` }}
                                        ></div>
                                    </div>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Poll;
