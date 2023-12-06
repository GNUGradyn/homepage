interface StartMenuProps {
    visible: boolean
}

const StartMenu = (props: StartMenuProps) => {
    return (
        <div style={{display: props.visible ? "block" : "none"}}>

        </div>
    )
}

export default StartMenu;