import StartMenuEntry from "./StartMenuEntry";

interface StartMenuProps {
}

const StartMenu = (props: StartMenuProps) => {
    return (
        <div>
            <StartMenuEntry name={"Resume"} icon={require("../assets/document_icon.png")}/>
        </div>
    )
}

export default StartMenu;