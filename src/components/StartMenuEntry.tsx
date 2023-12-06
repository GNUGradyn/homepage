interface StartMenuEntryProps {
    name: string
    icon: string
}

const StartMenu = (props: StartMenuEntryProps) => {
    return (
        <div>
            <p>{props.name}</p>
            <img src={props.icon}/>
        </div>
    )
}

export default StartMenu;