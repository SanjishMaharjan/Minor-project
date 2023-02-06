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
      {
        image: "https://images.unsplash.com/photo-1674768455530-8660e4dc9bfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        image: "https://images.unsplash.com/photo-1663322983064-f75e92343c5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        image: "https://images.unsplash.com/photo-1674569773812-a8cf2fe7b1e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        image: "https://images.unsplash.com/photo-1674821782079-e77a8e911118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        image: "https://images.unsplash.com/photo-1674232081537-38cfdfae8496?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      },
      {
        image: "https://images.unsplash.com/photo-1671608299875-a7b38ed9aa3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8eEh4WVRNSExnT2N8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      }
    ];

  return (
    <>
      <div className="header">
        <h1 className="welcome">WELCOME TO THE GALLERY !!</h1>
        <p className="welcome">FOR TOMORROWS MEMORY</p>
      </div>
      <div className="wrapper">
        {imgCollection.map((img) => {
          return (
            <>
              {/* <div className="full-img" id="fullBox">
              <img src="water.jpg" id="fullImg" />
              <span onclick="close()">x</span>
            </div> */}
              <div className="gallery">
                <div className="gallery_item">
                  <img src={img.image} onClick={openImg} />
                  <p className='gallery_detail'>{img.details}</p>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default Gallery;
