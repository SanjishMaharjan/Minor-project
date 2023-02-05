import React from 'react';
import './GalleryStyles.css';

const Gallery = () => {
  
  const imgCollection()
  
  return (
    <div className="gallery-container">
      <div className="gallery-scroll">
        <h1>Gallery</h1>
        <div className="gallery-item">
          <img src="../../src/assets/Images/abhipsa-pal-ILra9AOaXOE-unsplash.jpg" alt="Image 1" />
        </div>
        <div className="gallery-item">
          <img src="../../src/assets/Images/shahadat-rahman-BfrQnKBulYQ-unsplash.jpg" alt="Image 2" />
        </div>
        <div className="gallery-item">
          <img src="https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Image 3" />
        </div>
        <div className="gallery-item">
          <img src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Image 3" />
        </div>
        <div className="gallery-item">
          <img src="https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Image 3" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
