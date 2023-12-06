import StartMenuEntry from "./StartMenuEntry";
import "../components/StartMenu.css"

interface StartMenuProps {
}

const StartMenu = (props: StartMenuProps) => {
    return (
        <div id="StartMenu">
            <StartMenuEntry name={"Resume"} icon={require("../assets/document_icon.png")}/>
        </div>
    )
}

export default StartMenu;