import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import './App.css'
import {Link} from 'react-router-dom';

const Cloud = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Initialize AWS SDK
  AWS.config.update({
    accessKeyId: 'AKIA6GBMDAAGYV2EFTMP',
    secretAccessKey: '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',
    region: 'eu-north-1'
  });

  const s3 = new AWS.S3();

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = () => {
    const params = {
      Bucket: 'testvendo'
    };

    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err);
        alert('Error fetching file list.');
      } else {
        setFileList(data.Contents);
      }
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
  
    const params = {
      Bucket: 'testvendo',
      Key: file.name,
      Body: file
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        alert('Error uploading file.');
      } else {
        alert('File uploaded successfully.');
        fetchFileList(); // Refresh file list after upload
      }
    });
  };

  const readFile = (key) => {
    const params = {
      Bucket: 'testvendo',
      Key: key
    };
  
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
        alert('Error reading file.');
      } else {
        // Create a Blob object from the Buffer
        const blob = new Blob([data.Body.buffer], { type: data.ContentType });
        
        // Use FileReader to read the Blob as text
        const reader = new FileReader();
        reader.onload = function() {
          // File content will be available here
          console.log('File content:', reader.result);
        };
        reader.readAsText(blob);
      }
    });
  };

  const downloadFile = (key) => {
    const params = {
      Bucket: 'testvendo',
      Key: key
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
        alert('Error downloading file.');
      } else {
        const url = URL.createObjectURL(new Blob([data.Body], { type: data.ContentType }));
        const link = document.createElement('a');
        link.href = url;
        link.download = key;
        link.click();
      }
    });
  };

  const deleteFile = (key) => {
    const params = {
      Bucket: 'testvendo',
      Key: key
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        alert('Error deleting file.');
      } else {
        alert('File deleted successfully.');
        fetchFileList(); // Refresh file list after deletion
      }
    });
  };

  return (
    <div>
    <div className="cloud-container">
      <h2>File Management</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      {/* Render the list of uploaded files */}
      <ul>
        {fileList.map(file => (
          <li key={file.Key}>
            <span className="file-name">{file.Key}</span>
            <button className="read-button" onClick={() => readFile(file.Key)}>Read</button>
            <button className="download-button" onClick={() => downloadFile(file.Key)}>Download</button>
            <button className="delete-button" onClick={() => deleteFile(file.Key)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
    <Link to='/' className='to-home'>TO HOME PAGE</Link>
    </div>
  );
};

export default Cloud;