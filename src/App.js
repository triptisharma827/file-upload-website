
import vector1 from "./vector1.png";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const fileContent = e.target.result;
          const binaryFileContent = new Uint8Array(fileContent);

          const fileName = selectedFile.name; // Get the file name

          const response = await fetch(
            `https://i80w84z4s5.execute-api.us-east-1.amazonaws.com/FileUploadProjectLambdaFunction?file_name=${encodeURIComponent(
              fileName
            )}`,
            {
              method: "POST",
              body: binaryFileContent,
            }
          );

          if (response.ok) {
            setUploadStatus("File uploaded successfully.");
          } else {
            setUploadStatus("Failed to upload file. Invalid size or format");
          }
        };

        fileReader.readAsArrayBuffer(selectedFile);
      } catch (error) {
        console.error("Error:", error);
        setUploadStatus("An error occurred while uploading the file.");
      }
    }
  };

  return (
    <div className="upload-main">
      <div className="upload-header">

        <h1 className="main-heading">Store Your files in Cloud</h1>
        <p className="main-para">
          Upload your .docx file to store in AWS S3 bucket in .pdf format.
        </p>
      </div>
      <div className="upload-body">
      <img src={vector1} className="imag" alt="vector" height={'600px'} />
      <div className="upload-container">
        <h2 className="sub-heading">Upload .docx file less than 5mb size </h2>
        <input type="file" onChange={handleFileChange}  className="file-select"/>
        <br></br>
        <button onClick={handleFileUpload} className="buttonClass">Upload</button>
        <br></br>
        <div className="upload-status">{uploadStatus}</div>
      </div>
      </div>
    </div>
  );
}

export default App;
