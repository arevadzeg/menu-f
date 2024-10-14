import { Dispatch, SetStateAction, useRef } from "react";
import { ALERT_TYPE, useAlert } from "../../Alert/Alert";

interface useUploadProps {
  maxFileSize: number;
  allowedFileTypes: string[];
  onUpload?: (file: File) => void;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const useUpload = ({
  allowedFileTypes,
  maxFileSize,
  onUpload,
  setSelectedFile,
}: useUploadProps) => {
  const alert = useAlert();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFileTypeValid = (file: File) => {
    return allowedFileTypes.includes(file.type);
  };

  const isImageFile = (file: File) => {
    return file.type === "image/jpeg" || file.type === "image/png";
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFile = (file: File) => {
    if (file.size / 1024 / 1024 > maxFileSize) {
      return alert(
        `File size exceeds ${maxFileSize} MB limit.`,
        ALERT_TYPE.ERROR
      );
    }
    if (!isFileTypeValid(file)) {
      return alert(`Only JPG and PNG files are allowed.`, ALERT_TYPE.ERROR);
    }
    setSelectedFile(file);
    onUpload && onUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
      handleFile(e.dataTransfer.files[0]);
    } else {
      alert("Please upload only one file.", ALERT_TYPE.ERROR);
    }
  };

  const handleRemoveFile = () => setSelectedFile(null);

  return {
    handleRemoveFile,
    handleClick,
    handleDrop,
    handleFile,
    fileInputRef,
    handleDragOver,
    isImageFile,
  };
};

export default useUpload;
