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
        event.stopPropagation();
        if (rect.current && ref.current) {
            // top right
            if (event.clientX > rect.current.right - 6 && event.clientY < rect.current.top + 6) {
                ref.current.style.cursor = "ne-resize";
                resizeMode.current = "top-right";
            }

            // bottom right
            else if (event.clientX > rect.current.right - 6 && event.clientY > rect.current.bottom - 6) {
                ref.current.style.cursor = "se-resize";
                resizeMode.current = "bottom-right";
            }

            // bottom left
            else if (event.clientX < rect.current.left + 6 && event.clientY > rect.current.bottom - 6) {
                ref.current.style.cursor = "sw-resize";
                resizeMode.current = "bottom-left";
            }
            
            // top left
            else if (event.clientX < rect.current.left + 6 && event.clientY < rect.current.top + 6) {
                ref.current.style.cursor = "nw-resize";
                resizeMode.current = "top-left";
            }

            // right
            else if (event.clientX > rect.current.right - 6 ) {
                ref.current.style.cursor = "e-resize";
                resizeMode.current = "right";
            }
            
            // bottom
            else if (event.clientY > rect.current.bottom - 6) {
                ref.current.style.cursor = "s-resize";
                resizeMode.current = "bottom";
            }
            
            // left
            else if (event.clientX < rect.current.left + 6) {
                ref.current.style.cursor = "w-resize";
                resizeMode.current = "left";
            }

            // top
            else if (event.clientY < rect.current.top + 6) {
                ref.current.style.cursor = "n-resize";
                resizeMode.current = "top";
            }
            
            // else
            else {
                ref.current.style.cursor = "auto";
            }
        }

        // event listener for onMouseUp
        window.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseUp = (event: any) => {
        resizeMode.current = "none";
    }

    const handleGlobalMouseMove = (event: any) => {
        if (ref.current && rect.current && resizeMode.current !== "none") {
            switch (resizeMode.current) {
                case "left":
                    ref.current.style.left = `${event.clientX}px`;
                    ref.current.style.width = `${rect.current.right - event.clientX - 10}px`;
                    break;
                case "right":
                    ref.current.style.width = `${event.clientX - rect.current.left - 10}px`;
                    break;
                case "top":
                    ref.current.style.top = `${event.clientY}px`;
                    ref.current.style.height = `${rect.current.bottom - event.clientY - 10}px`;
                    break;
                case "bottom":
                    ref.current.style.height = `${event.clientY - rect.current.top - 10}px`;
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleGlobalMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove)
        }
    }, [ref, resizeMode]);

    const handleMouseMove = (event: any) => {
        if (rect.current && ref.current && resizeMode.current === "none") {
            // top right
            if (event.clientX > rect.current.right - 6 && event.clientY < rect.current.top + 6)         ref.current.style.cursor = "ne-resize";
            // bottom right
            else if (event.clientX > rect.current.right - 6 && event.clientY > rect.current.bottom - 6) ref.current.style.cursor = "se-resize";
            // bottom left
            else if (event.clientX < rect.current.left + 6 && event.clientY > rect.current.bottom - 6)  ref.current.style.cursor = "sw-resize";
            // top left
            else if (event.clientX < rect.current.left + 6 && event.clientY < rect.current.top + 6)     ref.current.style.cursor = "nw-resize";
            // right
            else if (event.clientX > rect.current.right - 6)    ref.current.style.cursor = "e-resize";
            // bottom
            else if (event.clientY > rect.current.bottom - 6)   ref.current.style.cursor = "s-resize";
            // left
            else if (event.clientX < rect.current.left + 6)     ref.current.style.cursor = "w-resize";
            // top
            else if (event.clientY < rect.current.top + 6)      ref.current.style.cursor = "n-resize";
            
            // else
            else ref.current.style.cursor = "auto";

            rect.current = ref.current.getBoundingClientRect()
        }
    }

    return (
        <div style={{...props.style, ...style, right: `calc(100% - ${props.width})px`, bottom: `calc(100% - ${props.height})px`, top: 0, left: 0}}
            onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onLoad={handleLoad} className="window" ref={(el: any) => {
            ref.current = el;
            setNodeRef(el)
        }}>
            {resizeMode.current != "none" && <div className="overlay"></div>}
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