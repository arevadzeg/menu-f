import React, { Dispatch, SetStateAction } from "react";
import "./Upload.scss";
import { FileIcon, UploadIcon } from "@radix-ui/react-icons";
import useUpload from "./hooks/useUpload";

interface FileUploadProps {
  maxFileSize?: number;
  allowedFileTypes?: string[];
  onUpload?: (file: File) => void;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  maxFileSize = 50,
  allowedFileTypes = ["image/jpeg", "image/png"],
  onUpload,
  selectedFile,
  setSelectedFile,
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

        <UploadIcon className=" upload-icon" />
        <p>
          Drag and drop file here or{" "}
          <span className="underline font-bold">Choose File</span>
        </p>
      </div>
      <span className="flex justify-between">
        <span>Supported formats: JPEG, PNG</span>
        <span>Maximum size: {maxFileSize}</span>
      </span>

      {selectedFile && (
        <div className="file-list">
          <div className="file-item">
            <div className="file-info">
              {isImageFile(selectedFile) ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  className="file-image-icon"
                />
              ) : (
                <span className="file-icon">
                  <FileIcon height={32} width={32} />
                </span>
              )}
              <div>
                <div className="flex">
                  <div className="file-name">{selectedFile.name}</div>
                  <span>
                    .
                    {
                      selectedFile.name.split(".")[
                        selectedFile.name.split(".").length - 1
                      ]
                    }
                  </span>
                </div>
                <span className="file-size">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
            <button className="remove-file-btn" onClick={handleRemoveFile}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
