import React, { Dispatch, SetStateAction } from 'react';
import './Upload.scss';
import { UploadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import useUpload from './hooks/useUpload';

interface FileUploadProps {
  maxFileSize?: number;
  allowedFileTypes?: string[];
  onUpload?: (file: File) => void;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  uploadedImage?: string;
}

const getImageNameFromUrl = (url: string): string => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const name = lastPart.split('?')[0];
  return decodeURIComponent(name);
};

const FileUpload: React.FC<FileUploadProps> = ({
  maxFileSize = 50,
  allowedFileTypes = ['image/jpeg', 'image/png'],
  onUpload,
  selectedFile,
  setSelectedFile,
  uploadedImage,
}) => {
  const {
    handleClick,
    handleDrop,
    handleFile,
    fileInputRef,
    handleDragOver,
    isImageFile,
  } = useUpload({
    allowedFileTypes,
    maxFileSize,
    setSelectedFile,
    onUpload,
  });

  const hasUploadedImage = uploadedImage && !selectedFile;

  return (
    <div className="file-upload">
      <div
        className="drop-zone"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
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
          Drag and drop file here or
          {' '}
          <span className="underline font-bold">Choose File</span>
        </p>
      </div>
      <span className="flex justify-between">
        <span>Supported formats: JPEG, PNG</span>
        <span>
          Maximum size:
          {maxFileSize}
          {' '}
          MB
        </span>
      </span>

      {(selectedFile || hasUploadedImage) && (
        <div className="file-list">
          <div className="file-item">
            <div className="file-info">
              {selectedFile ? (
                isImageFile(selectedFile) && (
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Uploaded"
                    className="file-image-icon"
                  />
                )
              ) : (
                <Image
                  src={String(uploadedImage)}
                  alt="Uploaded"
                  className="file-image-icon"
                />
              )}
              <div>
                <div className="flex">
                  <div className="file-name">
                    {selectedFile && selectedFile.name}
                    {uploadedImage
                      && !selectedFile
                      && getImageNameFromUrl(uploadedImage)}
                  </div>
                  <span>
                    .
                    {selectedFile ? selectedFile.name.split('.').pop() : ''}
                  </span>
                </div>
                <span className="file-size">
                  {selectedFile
                    ? (selectedFile.size / 1024 / 1024).toFixed(2)
                    : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
