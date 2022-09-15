import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Tiff from 'tiff.js';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

async function readFile(file, setFileContents) {
  const start = 0;
  const stop = file.size - 1;

  let blob;
  if (file.slice) {
    blob = file.slice(start, stop + 1);
  } else if (file.webkitSlice) {
    blob = file.webkitSlice(start, stop + 1);
  } else if (file.mozSlice) {
    blob = file.mozSlice(start, stop + 1);
  } else {
    console.log('no slice methods, unsupported browser');
  }
  const res = await blob.arrayBuffer(file);
  setFileContents(res);
}

function Viewer({ currentFile }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [fileContents, setFileContents] = useState(null);
  const [currentTiff, setCurrentTiff] = useState(null);

  useEffect(() => {
    readFile(currentFile, setFileContents);
  }, [currentPage]);

  if (fileContents && !currentTiff) {
    Tiff.initialize({
      TOTAL_MEMORY: 16777216 * 10
    })
    var tiff = new Tiff({
      buffer: fileContents
    });
    setCurrentTiff(tiff);
  }
  
  let output = <CircularProgress />;

  if (currentTiff) {
    const directoryCount = currentTiff.countDirectory();
    currentTiff.setDirectory(currentPage);
    const previousEnabled = currentPage > 0;
    const nextEnabled = currentPage < directoryCount - 1;

    output = <>
      <IconButton disabled={!previousEnabled} onClick={() => setCurrentPage(previousEnabled ? currentPage - 1 : currentPage)}>
        <KeyboardArrowLeftIcon sx={{ fontSize: 80 }} />
      </IconButton>
      <Paper elevation={24} sx={{ height: '100%' }} variant="outlined">
        <TransformWrapper>
          <TransformComponent wrapperStyle={{ height: '100%' }} contentStyle={{ height: '100%' }}>
            <div id="img-container">
              <img id="img" src={currentTiff && currentTiff.toDataURL()} />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Paper>
      <IconButton disabled={!nextEnabled} onClick={() => setCurrentPage(nextEnabled ? currentPage + 1 : currentPage)}>
        <KeyboardArrowRightIcon sx={{ fontSize: 80 }} />
      </IconButton>
    </>
  }

  return (
    <div className="Viewer">
      {output}
    </div>
  );
}

export default Viewer;
