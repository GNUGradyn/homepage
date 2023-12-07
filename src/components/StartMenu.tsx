import StartMenuEntry from "./StartMenuEntry";
import "../components/StartMenu.css"
import React, {forwardRef} from "react";
import {Windows} from "../models";

interface StartMenuProps {
    openWindow: (window: Windows) => void
}

const StartMenu = forwardRef((props: StartMenuProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <div id="StartMenu">
            <div id="InnerStartMenu" ref={ref}>
                <StartMenuEntry name={"Resume"} icon={require("../assets/document_icon.png")} onClick={()=>{props.openWindow(Windows.Resume)}}/>
            </div>
        </div>
    )
});

export default StartMenu;