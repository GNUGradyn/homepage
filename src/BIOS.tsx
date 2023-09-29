import { useEffect, useState } from 'react';
import './BIOS.css'
import LoadingBar from './LoadingBar';

interface BIOSProps {
    setBooted: (booted: boolean) => void;
}

const BIOS: React.FC<BIOSProps> = (props: BIOSProps) => {

  const [loadBar, setLoadBar] = useState(0.01);
  const [loops, setLoops] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (loadBar >= 1) {
        props.setBooted(true);
      } else {
        setLoadBar((previousValue: number) => previousValue + 0.05)
        setLoops((previousValue: number) => previousValue + 1)
      }
    }, 1000/loops)
  }, [loadBar]);

  return (
    <div id="BIOS">
        <p id="bios-options">
            F5&ensp;&emsp;= REBOOT<br></br>
            F11 = FULL SCREEN
        </p>
      <h1 id="bios-label">GRADYN BIOS</h1>
      <h1 id="bios-domain">GRADYN.COM</h1>
      <LoadingBar progress={loadBar}/>
    </div>
  );
};

export default BIOS;
