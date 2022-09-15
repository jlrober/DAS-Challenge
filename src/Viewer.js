import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Tiff from 'tiff.js';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import tiffFile from './Test_Document.tif';

function Viewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [directoryCount, setDirectoryCount] = useState(null);

  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    xhr.open("GET", tiffFile);
    xhr.onload = function (e) {
      Tiff.initialize({
        TOTAL_MEMORY: 16777216 * 10
      })
      console.log(this.response);
      var tiff = new Tiff({
        buffer: xhr.response
      });
      setDirectoryCount(tiff.countDirectory());
      tiff.setDirectory(currentPage);
      var pageContent = tiff.toDataURL();
      document.getElementById('img').src = pageContent;
    }
    xhr.send();
  }, [currentPage]);

  const previousEnabled = currentPage > 0;
  const nextEnabled = currentPage < directoryCount - 1;

  const Content = <>
    <IconButton disabled={!previousEnabled} onClick={() => setCurrentPage(previousEnabled ? currentPage - 1 : currentPage)}>
      <KeyboardArrowLeftIcon sx={{ fontSize: 80 }} />
    </IconButton>
    <Paper elevation={24} sx={{ height: '100%' }} variant="outlined">
      <TransformWrapper>
        <TransformComponent wrapperStyle={{ height: '100%' }} contentStyle={{ height: '100%' }}>
          <div id="img-container">
            <img id="img"/>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </Paper>
    <IconButton disabled={!nextEnabled} onClick={() => setCurrentPage(nextEnabled ? currentPage + 1 : currentPage)}>
      <KeyboardArrowRightIcon sx={{ fontSize: 80 }} />
    </IconButton>
  </>

  return (
    <div className="Viewer">
      { directoryCount ? Content : <CircularProgress /> }
    </div>
  );
}

export default Viewer;
