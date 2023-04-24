import React, { useEffect, useState, useRef } from "react";

import styles from "../../styles/createpost.module.css";

function ImgPreview(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    props.setImage(file);
  }, [file, props]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <>
      <div className={`${props.imgPicker}`}>
        <div className={`${props.inputPicker}`}>
          <input
            id={props.id}
            ref={filePickerRef}
            required
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
            className={`${props.inputImg}`}
            style={
              {
                // opacity: 0,
              }
            }
          />
        </div>
        <div className={`${props.postImg}`} onClick={pickImageHandler}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Click to pick Image</p>}
        </div>
      </div>
    </>
  );
}

export default ImgPreview;
