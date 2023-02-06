import React, { useState } from 'react';
import './GalleryStyles.css';

const Gallery = () => {

  const openImg = (pic) => {
    fullBox.style.display = "flex";
    fullImg.src = pic;
  }

  const imgCollection =
    [
      {
        image: "../../src/assets/Images/abhipsa-pal-ILra9AOaXOE-unsplash.jpg",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      },
      {
        image: "../../src/assets/Images/shahadat-rahman-BfrQnKBulYQ-unsplash.jpg",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",

      },
      {
        image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
    ];

  return (
    <>
      <div className="header">
        <h1 className="welcome">WELCOME TO THE GALLERY !!</h1>
        <p className="welcome">FOR TOMORROWS MEMORY</p>
      </div>
      {imgCollection.map((img) => {
        return (
          <>

            <div className="full-img" id="fullBox">
              <img src="water.jpg" id="fullImg" />
              <span onclick="close()">x</span>
            </div>
            <div className="gallery" id="gallery">
              <img src={img.image} onClick={openImg} />
            </div>
          </>
        )
      })}
    </>
  )
}

export default Gallery;
