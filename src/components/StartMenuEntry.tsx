import "./StartMenuEntry.css"

interface StartMenuEntryProps {
    name: string
    icon: string
    onClick: () => void
}

const StartMenu = (props: StartMenuEntryProps) => {
    return (
        <div className="start-menu-entry" onClick={props.onClick}>
            <img src={props.icon}/>
            <p>{props.name}</p>
        </div>
    )
}

export default StartMenu;