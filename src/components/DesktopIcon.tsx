import "./DesktopIcon.css"

interface DesktopIconProps {
    name: string
    icon: string
}

const DesktopIcon = (props: DesktopIconProps) => {
    return <div className="desktop-icon">
        <img src={props.icon}/>
        <p>{props.name}</p>
    </div>
}

export default DesktopIcon;