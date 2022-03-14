import { useState, useEffect } from "react";
import "../styles.css";

const SearchImage = () => {
  const [firstText, setFirstText] = useState("Haaa...");
  const [secondText, setSecondText] = useState("Heeee....");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [loadState, setLoadState] = useState(false);

  async function dataRetrive() {
    let response = await fetch("https://api.imgflip.com/get_memes");
    let data = await response.json();
    localStorage.setItem("data_list", JSON.stringify(data.data.memes));
    setImages(JSON.parse(localStorage.getItem("data_list")));
  }

  useEffect(() => {
    localStorage.getItem("data_list")
      ? setImages(JSON.parse(localStorage.getItem("data_list")))
      : dataRetrive();
  }, []);

  return (
    <div className="container">
      <div className="container-header">
        <input
          type="text"
          placholder="enter top meme string..."
          onChange={(e) => setFirstText(e.target.value)}
          value={firstText}
        />
        <input
          type="text"
          placholder="enter bottom meme string..."
          value={secondText}
          onChange={(e) => setSecondText(e.target.value)}
        />
        <button
          onClick={() => {
            let index = Math.floor(Math.random() * images.length);
            let tempImage = images[index];
            setLoadState(!loadState);
            setImage(tempImage);
          }}
        >
          Generate Meme
        </button>
      </div>
      <div
        className={
          "container-body" + loadState ? "display-show" : "display-hide"
        }
      >
        <p className="text text-top">{firstText}</p>
        <div className="image-container ">
          <img src={image.url} alt="" />
        </div>
        <p className="text text-bottom">{secondText}</p>
      </div>
    </div>
  );
};

export default SearchImage;
