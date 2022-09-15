import './App.css';
import Viewer from './components/Viewer';
import FileSelector from './components/FileSelector';
import { useState } from 'react';

function App() {
  const [currentFile, setCurrentFile] = useState("");

  return (
    <div className="App">
      { currentFile !== "" ? <Viewer currentFile={currentFile} />
        : <FileSelector currentFile={currentFile} setCurrentFile={setCurrentFile} />
      }
    </div>
  );
}

export default App;
