import React, { useState, useEffect, useMemo, useContext} from "react";
import { useDropzone } from "react-dropzone";
import './ImageDropzone.css';

export default function ImageDropzone({ whenDropped, setImage, RAW }) {
  const [ images, setImages ] = useState([]);
  const onDrop = (acceptedFiles) => {
    const allowedExtensions = RAW ? ["dng"] : ["png", "jpg", "jpeg"];

    const validFiles = acceptedFiles.filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(ext);
    });

    if (validFiles.length === 0) {
      alert(`Only ${allowedExtensions.reduce((prev, curr, i) => {return prev ? i < allowedExtensions.length-1 ? prev + `, ${curr}` : prev + `, and ${curr}` : curr})} file extensions are allowed!`);
      return;
    }

    const filesWithPreview = validFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    setImages((prev) => [...prev, ...filesWithPreview]);
    whenDropped();
    setImage && setImage(filesWithPreview[0].preview);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="image-dropzone-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag & drop an image here, or click to select a file</p>
        )}
      </div>
    </div>
  );
}
