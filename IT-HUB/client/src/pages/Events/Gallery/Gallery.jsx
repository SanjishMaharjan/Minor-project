import { useLoaderData, useNavigation } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../components/Loader";
import "./GalleryStyles.scss";
import { getDate } from "../../../Utils/dateConverter";
import { useQuery } from "@tanstack/react-query";

const Gallery = () => {
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const { data: imgCollection } = useQuery(["gallery"], {
    enabled: false,
  });

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="header">
        <h1 className="welcome">WELCOME TO THE GALLERY !!</h1>
        {/* <p className="welcome">FOR TOMORROW'S MEMORIES</p> */}
      </div>
      <div className="gallery-wrapper">
        {imgCollection.map((img) => {
          return (
            <div key={img._id} className="gallery">
              <div className="gallery-item">
                <img src={img.images[0].imagePath} onClick={() => setShowImageFullScreen(true)} />
                <div className="gallery-detail">
                  <h3>
                    <lord-icon
                      src="https://cdn.lordicon.com/ncxoarcp.json"
                      trigger="hover"
                    ></lord-icon>{" "}
                    {img.title}
                  </h3>
                  <hr />
                  <h4>{img.description}</h4>
                  <p style={{ fontSize: "0.8rem" }}>{getDate(img.createdAt)} ago</p>
                </div>
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
