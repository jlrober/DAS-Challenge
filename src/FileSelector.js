import React from 'react';
import Button from '@mui/material/Button';

const FileSelector = ({ setCurrentFile, currentFile }) => {
  const fileInput = React.useRef();

  return <>
    <Button
      variant="contained"
      onClick={()=>fileInput.current.click()}
    >
      Select File
    </Button>
    <input
      ref={fileInput} 
      type="file"
      onChange={e => setCurrentFile(e.target.files[0])}
      value={currentFile}
      style={{ display: 'none' }}
    />
  </>
}

export default FileSelector;