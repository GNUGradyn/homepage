import { useEffect, useState } from 'react';
import './App.css';
import BIOS from './components/BIOS';
import OS from './components/OS';
import {Windows} from "./models";
import {WindowsContext} from "./contexts/WindowsContext";

function App() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<Windows[]>([]);
  const [windowsVisible, setWindowsVisible] = useState<Windows[]>([]);
  const [windowsCovered, setWindowsCovered] = useState<Windows[]>([]);

  return (
    <div className="App">
      <WindowsContext.Provider value={{windows, setWindows, windowsVisible, setWindowsVisible, windowsCovered, setWindowsCovered}}>
        {booted ? <OS/> : <BIOS setBooted={setBooted}/>}
      </WindowsContext.Provider>
    </div>
  );
}

export default App;
