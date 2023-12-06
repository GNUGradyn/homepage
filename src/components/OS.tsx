import {useCallback, useEffect, useRef, useState} from "react"
import './OS.css'
import Window from './Window'

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);
    const [showTaskbar, setShowTaskbar] = useState(false);
    const [startMenuVisible, setStartMenuVisible] = useState(false);

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
    const [startIconWidth, setStartIconWidth] = useState(0);
    const [startTextWidth, setStartTextWidth] = useState(0);

    const iconMeasuredRef: React.RefCallback<HTMLElement> = useCallback((node) => {
        if (node !== null) {
            setStartIconWidth(node.getBoundingClientRect().width);
        }
    }, []);

    const textMeasuredRef: React.RefCallback<HTMLElement> = useCallback((node) => {
        if (node !== null) {
            setStartTextWidth(node.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {

        const handleResize = () => {
            setStartTextWidth(document.getElementById("start-text")?.offsetWidth ?? 0);
            setStartIconWidth(document.getElementById("start-icon")?.offsetWidth ?? 0);
        }

        window.addEventListener('resize', handleResize);


        // cleanup this component

        return () => {

            window.removeEventListener('resize', handleResize);

        };

    }, []);

    return (
        loaded ?
            <div id="OS">
                {showTaskbar && <div id="taskbar">
                    <div id="start-button">
                        <div style={{width: startTextWidth + startIconWidth + 5}}>
                            <img id="start-icon" ref={iconMeasuredRef} src={require("../assets/start.png")}/>
                            <p id="start-text" ref={textMeasuredRef}>Start</p>
                        </div>
                    </div>
                </div>}
            </div>
            :
            <div id="loading" onClick={() => {
                setLoaded(true)
            }}>
                {startupWindowVisible && <div>
                    <Window title="Starting Up">
                        <div id="startup-window-content">
                            <h1>Starting Gradyn OS</h1>
                            <img id="startup-img" src={require("../assets/gradyn.png")}/>
                        </div>
                    </Window>
                </div>}
            </div>
    )
}

export default OS