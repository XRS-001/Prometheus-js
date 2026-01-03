import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import './ImageDropzone.css';

export default function ImageDropzone() {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prev) => [...prev, ...filesWithPreview]);
  };

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
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

      <div className="preview-container">
        {images.map((file, index) => (
          <img
            key={index}
            className="preview-image"
            src={file.preview}
            alt={file.name}
          />
        ))}
      </div>
    </div>
  );
}
