import { useState } from "react"
import './OS.css'
import Window from './Window'

const OS = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        loaded ?
            (
                <div id="OS">

                </div>
            )
            :
            (
                <div id="loading">
                    <Window title="Starting Up">
                    
                    </Window>
                </div>
            )
    )
}

export default OS