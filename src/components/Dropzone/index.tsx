import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "@images/upload-icon.svg";

interface ImageDropzoneProps {
  onImageUpload: (previewUrl: string | null) => void;
  value: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        onImageUpload(previewUrl);
      }
    },
    [onImageUpload],
  );

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onImageUpload(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/jfif": [".jfif"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`image-dropzone p-4 border border-secondary ${
        isDragActive ? "border-2 border-primary" : "border-dotted"
      }`}
    >
      <input {...getInputProps()} />
      <div className="dropzone-content text-center position-relative">
        {preview ? (
          <div className="preview-container position-relative">
            <img src={preview} alt="Preview" className="img-fluid" />
            <div className="overlay"></div>
            <button
              type="button"
              className="btn-close remove-btn position-absolute"
              aria-label="Close"
              onClick={removeImage}
            ></button>
          </div>
        ) : (
          <>
            <img alt="upload-icon" src={uploadIcon} />
            <p className="mb-0">
              Arraste e coloque o arquivo ou{" "}
              <strong className="text-decoration-underline">
                escolha um arquivo
              </strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
