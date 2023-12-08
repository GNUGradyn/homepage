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
                <StartMenuEntry name={"Contact Me"} icon={require("../assets/outlook_express-3.png")} onClick={()=>{props.openWindow(Windows.Contact)}}/>
                <StartMenuEntry name={"Virtual Box"} icon={require("../assets/Virtualbox_logo.png")} onClick={()=>{props.openWindow(Windows.VirtualBox)}}/>

            </div>
        </div>
    )
});

export default StartMenu;