import './NavbarButton.css'

interface NavbarButtonProps {
    icon: string
    onClick: () => void
}

const NavbarButton: React.FC<NavbarButtonProps> = (props: NavbarButtonProps) => {
    return (
        <div className="navbar-button" onClick={props.onClick}>
            <div>
                <img src={props.icon}/>
            </div>
        </div>
    )
}

export default NavbarButton;