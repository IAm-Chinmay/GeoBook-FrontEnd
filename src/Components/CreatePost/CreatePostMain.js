import React, { useContext, useState } from "react";

import styles from "../../styles/createpost.module.css";

import ImgPreview from "./ImgPreview";

import { useHttpClient } from "../httpHooks";
import { AuthContext } from "../AuthContext";
import { useRouter } from "next/router";

function CreatePostMain() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [add, setAdd] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [Image, setImage] = useState();
  const [disable, setDisable] = useState(false);

  const auth = useContext(AuthContext);

  const { sendRequest } = useHttpClient();

  const router = useRouter();

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const resp = await fetch(
        `https://eu1.locationiq.com/v1/search?key=pk.3d476748cccfbd8f5573913c51a26879&q=${add}&format=json`
      );
      const res = await resp.json();
      console.log(res.slice(0, 1));
      setLat(await res.slice(0, 1).map((a) => a.lat));
      setLong(await res.slice(0, 1).map((a) => a.lon));
      console.log(lat);
      console.log(long);
    } catch (err) {}

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("pImage", Image);
    formData.append("user", auth.userId);
    lat && formData.append("lat", lat);
    long && formData.append("lon", long);
    try {
      // await sendRequest(`http://localhost:5000/api/places`, "POST", formData, {
      await sendRequest(`http://localhost:5000/api/places`, "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      router.push("/");
    } catch (err) {}
  };

  const showPosition = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    lat && long && setDisable(true);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    // lat && alert(lat);
    // long && alert(long);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 5000,
  };

  return (
    <>
      <div className={styles.createPostMain}>
        <h1>Where this time ?</h1>
        <div className={styles.createFormMain}>
          <form onSubmit={postSubmitHandler}>
            <div className={styles.formInputs}>
              <h3>Title</h3>
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                type={"text"}
                required
              />

              <h3>Address</h3>
              <input
                onChange={(event) => {
                  setAdd(event.target.value);
                }}
                disabled={disable}
                type={"text"}
              />
              {
                <input
                  type="button"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                      showPosition,
                      errorCallback,
                      geolocationOptions
                    );
                  }}
                  className={styles.geoBtn}
                  value={
                    disable
                      ? "Used Current Location"
                      : "Select Current Location"
                  }
                />
                //   {/* {disable
                //     ? "Used Current Location"
                //     : "Select Current Location"}
                // </input> */}
              }
              <h3>Description</h3>
              <textarea
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
                required
                rows="5"
                cols="30"
              />
            </div>
            <div className={styles.createImg}>
              <ImgPreview
                setImage={setImage}
                postImg={styles.imgPreview}
                imgPicker={styles.imgPicker}
              />
            </div>
            <button>Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePostMain;
