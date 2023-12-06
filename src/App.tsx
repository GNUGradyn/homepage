import { useEffect, useState } from 'react';
import './App.css';
import BIOS from './components/BIOS';
import OS from './components/OS';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="App">
      {booted ? <OS/> : <BIOS setBooted={setBooted}/>}
    </div>
  );
}

export default App;
