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
                        <div style={{height: "50vh", width: "20vw"}}>
                            <img src={require("../")}
                        </div>
                    </Window>
                </div>
            </div>
    )
}

export default OS