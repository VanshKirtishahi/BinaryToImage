import React, { useState } from 'react';

const App = () => {
  const [binaryData, setBinaryData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        setBinaryData(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const downloadBinaryData = () => {
    if (binaryData) {
      const blob = new Blob([binaryData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.bin`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const convertToImage = () => {
    if (binaryData) {
      const blob = new Blob([binaryData], { type: 'image/jpeg' }); // Adjust type based on your image
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    }
  };

  return (
    <div className="App">
      <h1>Image to Binary Converter</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {binaryData && (
        <div>
          <h3>Binary Data:</h3>
          <pre>{JSON.stringify(new Uint8Array(binaryData), null, 2)}</pre>
          <button onClick={downloadBinaryData}>Download Binary Data</button>
          <button onClick={convertToImage}>Convert to Image</button>
          {imageSrc && (
            <div>
              <h3>Converted Image:</h3>
              <img src={imageSrc} alt="Converted" style={{ maxWidth: '300px', marginTop: '10px' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
