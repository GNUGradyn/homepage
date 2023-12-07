import "./Window.css"
import {CSSProperties, useEffect, useRef} from "react";
import useDraggables from "../hooks/useDraggables";
import {DragEndEvent, useDndMonitor, useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";

interface WindowProps {
    title: string
    children: React.ReactNode
    width: string
    height: string
    style?: CSSProperties
}

const Window: React.FC<WindowProps> = (props: WindowProps) => {

    const {map: coordinatesMap, setMap: setCoordinatesMap} = useDraggables();

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.title + "-win"
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const ref = useRef<HTMLDivElement>(null);

    const rect = useRef<DOMRect>();

    useEffect(() => {
        if (coordinatesMap[props.title + "-win"] != undefined) {
            if (ref.current != undefined) {
                ref.current.style.position = "absolute";
                ref.current.style.top = coordinatesMap[props.title + "-win"].y + "px";
                ref.current.style.left = coordinatesMap[props.title + "-win"].x + "px";
            }
        }
    }, [coordinatesMap]);

    const handleLoad = () => {
        if (ref.current != null) rect.current = ref.current.getBoundingClientRect();
    }

    useDndMonitor({
        onDragEnd(event: DragEndEvent) {
            if (ref.current != null) rect.current = ref.current.getBoundingClientRect();
        }
    })

    return (
        <div style={{...props.style, ...style, width: props.width, height: props.height}} onLoad={handleLoad} className="window" ref={ref} {...listeners} {...attributes} >
            <div className="window-head" ref={setNodeRef}>
                <p>{props.title}</p>
            </div>
            <div className="window-body">
                {props.children}
            </div>
        </div>
    );
};

export default Window;