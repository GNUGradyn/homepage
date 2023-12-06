import StartMenuEntry from "./StartMenuEntry";
import "../components/StartMenu.css"
import React, {forwardRef} from "react";

interface StartMenuProps {
}

const StartMenu = forwardRef((props: StartMenuProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <div id="StartMenu">
            <div id="InnerStartMenu" ref={ref}>
                <StartMenuEntry name={"Resume"} icon={require("../assets/document_icon.png")}/>
            </div>
        </div>
    )
});

export default StartMenu;