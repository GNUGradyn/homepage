import { useState } from "react"
import './OS.css'

const OS = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        loaded ?
            <div id="OS"></div>
            :
            <div id="loading">
                <div id="loading-box">
                    <div id="loading-box-header">
                        <span style={{color: "white"}}>Starting Up</span>
                    </div>
                </div>
            </div>
    )
}

export default OS