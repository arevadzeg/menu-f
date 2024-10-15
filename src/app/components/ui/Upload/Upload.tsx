import React, { Dispatch, SetStateAction, useEffect } from "react";
import "./Upload.scss";
import { FileIcon, UploadIcon } from "@radix-ui/react-icons";
import useUpload from "./hooks/useUpload";
import axios from "axios";

interface FileUploadProps {
  maxFileSize?: number;
  allowedFileTypes?: string[];
  onUpload?: (file: File) => void;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  uploadedImage?: string; // This is the URL of the previously uploaded file
}

const getImageNameFromUrl = (url: string): string => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const name = lastPart.split("?")[0];
  return decodeURIComponent(name);
};

export const FileUpload: React.FC<FileUploadProps> = ({
  maxFileSize = 50,
  allowedFileTypes = ["image/jpeg", "image/png"],
  onUpload,
  selectedFile,
  setSelectedFile,
  uploadedImage, // URL of the pre-uploaded image
}) => {
  const {
    handleClick,
    handleDrop,
    handleFile,
    handleRemoveFile,
    fileInputRef,
    handleDragOver,
    isImageFile,
  } = useUpload({
    allowedFileTypes,
    maxFileSize,
    setSelectedFile,
    onUpload,
  });

  const hasUploadedImage = uploadedImage && !selectedFile; // Check if there's an uploaded image but no selected file

  return (
    <div className="file-upload">
      <div
        className="drop-zone"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="file-input hidden"
          ref={fileInputRef}
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />

        <UploadIcon className="upload-icon" />
        <p>
          Drag and drop file here or{" "}
          <span className="underline font-bold">Choose File</span>
        </p>
      </div>
      <span className="flex justify-between">
        <span>Supported formats: JPEG, PNG</span>
        <span>Maximum size: {maxFileSize} MB</span>
      </span>

      {(selectedFile || hasUploadedImage) && (
        <div className="file-list">
          <div className="file-item">
            <div className="file-info">
              {/* Display the pre-uploaded image if there's no selected file */}
              {selectedFile ? (
                isImageFile(selectedFile) && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Uploaded"
                    className="file-image-icon"
                  />
                )
              ) : (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="file-image-icon"
                />
              )}
              <div>
                <div className="flex">
                  <div className="file-name">
                    {selectedFile && selectedFile.name}
                    {uploadedImage &&
                      !selectedFile &&
                      getImageNameFromUrl(uploadedImage)}
                    {/* {selectedFile ? selectedFile.name :} */}
                  </div>
                  <span>
                    .{selectedFile ? selectedFile.name.split(".").pop() : ""}
                  </span>
                </div>
                <span className="file-size">
                  {selectedFile
                    ? (selectedFile.size / 1024 / 1024).toFixed(2)
                    : ""}
                </span>
              </div>
            </div>
            {/* <div className="remove-file-btn" onClick={handleRemoveFile}>
              &times;
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
