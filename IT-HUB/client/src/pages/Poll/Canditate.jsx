import React from 'react';

const Candidate = ({ name, photo, onClick }) => {
    return (
        <div className="candidate" onClick={onClick}>
            {/* <img height="150" src={photo} alt={name} />
            <h3>{name}</h3> */}
            <div className="photo-wrapper">
                {/* <img src={photo} alt={name} className="photo" /> */}
                {/* <h3>{name}</h3> */}
                {/* <div className="overlay" >
                    <p>Click to vote for {name}</p>
                </div> */}
            </div>
        </div>
    );
};

export default Candidate;
