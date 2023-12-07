import "./Window.css"
import {CSSProperties, useEffect, useRef} from "react";
import useDraggables from "../hooks/useDraggables";
import {DragEndEvent, useDndMonitor, useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;

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

    const ref = useRef<HTMLDivElement>();
    const resizing = useRef<boolean>(false);

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

    const resizeMode = useRef<string>("none");

    const handleMouseDown = (event: any) => {
        resizing.current = true;
    }

    const handleGlobalMouseMove = (event: any) => {
        if (ref.current && rect.current && resizeMode.current !== "none" && resizing) {
            switch (resizeMode.current) {
                case "left":
                    ref.current.style.left = `${event.clientX}px`;
                    break;
            }
            rect.current = ref.current.getBoundingClientRect()
        }
    };

    const handleMouseMove = (event: any) => {
        if (rect.current && ref.current) {
            if (event.clientX > rect.current.right - 6) { // right border
                ref.current.style.cursor = "w-resize";
                resizeMode.current = "right";
            } else if (event.clientX < rect.current.left + 6) { // left border
                ref.current.style.cursor = "w-resize";
                resizeMode.current = "left";
            } else if (event.clientY > rect.current.bottom - 6) { // bottom border
                ref.current.style.cursor = "n-resize";
                resizeMode.current = "bottom";
            } else if (event.clientY < rect.current.top + 6) { // top border
                ref.current.style.cursor = "n-resize";
                resizeMode.current = "top";
            } else {
                ref.current.style.cursor = "auto";
                resizeMode.current = "none";
            }
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleGlobalMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove)
        }
    }, []);


    return (
        <div style={{...props.style, ...style, right: rect.current?.left ?? 0 + props.width, height: props.height}}
             onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onLoad={handleLoad} className="window" ref={(el: any) => {
            ref.current = el;
            setNodeRef(el)
        }}>
            {resizing && <div className="overlay"></div>}
            <div className="window-head"{...listeners} {...attributes}>
                <p>{props.title}</p>
            </div>
            <div className="window-body">
                {props.children}
            </div>
        </div>
    );
};

export default Window;