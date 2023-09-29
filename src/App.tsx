import { useEffect, useState } from 'react';
import './App.css';
import BIOS from './BIOS';
import OS from './OS';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="App">
      {booted ? <OS/> : <BIOS setBooted={setBooted}/>}
    </div>
  );
}

export default App;
