import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.svg'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p>Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/file-upload.svg" width={96} height={77} />
          <h3 className="base-medium text-light-2 mt-6">Upload photo here</h3>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
