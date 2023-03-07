import { useLoaderData, useNavigation } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import "./GalleryStyles.scss";
import { getDate } from "../../Utils/dateConverter";
import { useQuery } from "@tanstack/react-query";

const Gallery = () => {
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const { data: imgCollection } = useQuery(["gallery"], {
    enabled: false,
  });

  const openImg = (pic) => {
    fullBox.style.display = "flex";
    fullImg.src = pic;
  };

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="header">
        <h1 className="welcome">WELCOME TO THE GALLERY !!</h1>
        <p className="welcome">FOR TOMORROW'S MEMORIES</p>
      </div>
      <div className="gallery-wrapper">
        {imgCollection.map((img) => {
          return (
            <div key={img._id} className="gallery">
              <div className="gallery-item">
                <img src={img.images[0].imagePath} onClick={() => setShowImageFullScreen(true)} />
                <p className="gallery-detail">{img.title}</p>
                <p className="gallery-detail">{img.description}</p>
                <p className="gallery-detail">{getDate(img.createdAt)} ago</p>
                {showImageFullScreen && (
                  <div className="fullscreen-image" onClick={() => setShowImageFullScreen(false)}>
                    <img className="image" src={img.images[0].imagePath} alt="" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
