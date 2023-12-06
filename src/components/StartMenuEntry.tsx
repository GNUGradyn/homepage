import "./StartMenuEntry.css"

interface StartMenuEntryProps {
    name: string
    icon: string
}

const StartMenu = (props: StartMenuEntryProps) => {
    return (
        <div className="start-menu-entry">
            <img src={props.icon}/>
            <p>{props.name}</p>
        </div>
    )
}

export default StartMenu;