import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import "./GalleryStyles.scss";
import { convertToYDHMS } from "../../Utils/dateConverter";

const Gallery = () => {

  const imgCollection = useLoaderData();
  console.log(imgCollection);

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
      <div className="wrapper">
        {imgCollection.map((img) => {
          return (
            <>
              {/* <div className="full-img" id="fullBox">
              <img src="water.jpg" id="fullImg" />
              <span onclick="close()">x</span>
            </div> */}
              <div className="gallery">
                <div className="gallery-item">
                  <img src={img.images[0].imagePath} onClick={openImg} />
                  <p className='gallery-detail'>{img.title}</p>
                  <p className='gallery-detail'>{img.description}</p>
                  <p className='gallery-detail'>{convertToYDHMS(img.createdAt)} ago</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
