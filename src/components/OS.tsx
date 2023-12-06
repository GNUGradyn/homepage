import {useEffect, useState} from "react"
import './OS.css'
import Window from './Window'

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setStartupWindowVisible(true);
        }, 1000)
    }, []);

    return (
        loaded ?
            <div id="OS">

            </div>
            :
            <div id="loading">
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