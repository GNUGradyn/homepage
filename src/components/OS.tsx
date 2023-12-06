import {useEffect, useRef, useState} from "react"
import './OS.css'
import Window from './Window'

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);
    const [showTaskbar, setShowTaskbar] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStartupWindowVisible(true);
        }, 1000)
    }, []);

    useEffect(() => {
        if (startupWindowVisible) {
            setTimeout(() => {
                setLoaded(true);
            }, 3000)
        }
    }, [startupWindowVisible]);

    useEffect(() => {
        setTimeout(() => {
            setShowTaskbar(true)
        }, 1000)
    }, [loaded])

    // Dumb workaround to firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1868645
    const startIconRef = useRef<HTMLImageElement>(null);
    const startTextRef = useRef<HTMLParagraphElement>(null);

    return (
        loaded ?
            <div id="OS">
                <div id="taskbar" style={{display: showTaskbar ? "flex": "none"}}>
                    <div id="start-button">
                        <div style={{width: (startTextRef.current?.offsetWidth ?? 0) + (startTextRef.current?.offsetWidth ?? 0)}}>
                            <img ref={startIconRef} src={require("../assets/start.png")}/>
                            <p ref={startTextRef}>Start</p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div id="loading" onClick={()=>{setLoaded(true)}}>
                <div style={{display: startupWindowVisible ? "block" : "none"}}>
                    <Window title="Starting Up" >
                        <div id="startup-window-content">
                            <h1>Starting Gradyn OS</h1>
                            <img id="startup-img" src={require("../assets/gradyn.png")}/>
                        </div>
                    </Window>
                </div>
            </div>
    )
}

export default OS