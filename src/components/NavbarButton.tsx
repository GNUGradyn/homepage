import './NavbarButton.css'
import {CSSProperties} from "react";

interface NavbarButtonProps {
    icon: string
    onClick: () => void
    style?: CSSProperties
}

const NavbarButton: React.FC<NavbarButtonProps> = (props: NavbarButtonProps) => {
    return (
        <div className="navbar-button" onClick={props.onClick} style={props.style}>
            <div>
                <img src={props.icon}/>
            </div>
        </div>
    )
}

export default NavbarButton;