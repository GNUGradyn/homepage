import "./DesktopIcon.css"
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import useDraggables from "../hooks/useDraggables";
import {useEffect, useRef} from "react";

interface DesktopIconProps {
    name: string
    icon: string
    onClick: () => void
}

const DesktopIcon = (props: DesktopIconProps) => {

    const {map: coordinatesMap, setMap: setCoordinatesMap} = useDraggables();

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.name
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        if (coordinatesMap[props.name] != undefined) {
            if (ref.current != undefined) {
                ref.current.style.position = "absolute";
                ref.current.style.top = coordinatesMap[props.name].top + "px";
                ref.current.style.left = coordinatesMap[props.name].left + "px";
            }
        }
    }, [coordinatesMap]);

    return <div onClick={props.onClick} className="desktop-icon" ref={(el: HTMLDivElement) => {setNodeRef(el); ref.current = el}} style={style} {...listeners} {...attributes}>
        <img src={props.icon}/>
        <p>{props.name}</p>
    </div>
}

export default DesktopIcon;