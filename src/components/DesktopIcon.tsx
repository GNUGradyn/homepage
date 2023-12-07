import "./DesktopIcon.css"
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

interface DesktopIconProps {
    name: string
    icon: string
}

const DesktopIcon = (props: DesktopIconProps) => {

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.name
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return <div className="desktop-icon" ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <img src={props.icon}/>
        <p>{props.name}</p>
    </div>
}

export default DesktopIcon;