import "./Window.css"
import {CSSProperties, useEffect, useRef, useState} from "react";
import useDraggables from "../hooks/useDraggables";
import {DragEndEvent, useDndMonitor, useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import {Simulate} from "react-dom/test-utils";
import {produce} from "immer";
import NavbarButton from "./NavbarButton";
// @ts-ignore
import xSolidIcon from "../assets/x-solid.svg";
// @ts-ignore
import MaximizedIcon from "../assets/maximized.svg";
// @ts-ignore
import MaximizeIcon from "../assets/maximize.svg";

interface WindowProps {
    title: string
    children: React.ReactNode
    width: string
    height: string
    style?: CSSProperties
    icon?: string
    requestClose: () => void
}

const Window: React.FC<WindowProps> = (props: WindowProps) => {

    const [maximized, setMaximized] = useState(false);

    const {map: coordinatesMap, setMap: setCoordinatesMap} = useDraggables();

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.title + "-win",
        disabled: maximized
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const ref = useRef<HTMLDivElement>();

    const rect = useRef<DOMRect>();

    useEffect(() => {
        if (coordinatesMap[props.title + "-win"] && ref.current) {
            if (maximized) {
                ref.current.style.right = "0px";
                ref.current.style.bottom = "0px";
                ref.current.style.top = "0px";
                ref.current.style.left = "0px";
            } else {
                if (ref.current != undefined) {
                    ref.current.style.position = "absolute";
                    const rect = coordinatesMap[props.title + "-win"];
                    console.log(coordinatesMap[props.title + "-win"])
                    ref.current.style.right = `calc(100% - (${rect.left}px + ${rect.width}px))`; // For some reason rect.right and rect.bottom are wrong
                    ref.current.style.bottom = `calc(100% - (${rect.top}px + ${rect.height}px))`; // For some reason rect.right and rect.bottom are wrong
                    ref.current.style.top = rect.top + "px";
                    ref.current.style.left = rect.left + "px";
                }
            }
        }
    }, [coordinatesMap, maximized]);

    const handleLoad = () => {
        if (ref.current != null) rect.current = ref.current.getBoundingClientRect();
    }

    useDndMonitor({
        onDragEnd(event: DragEndEvent) {
            if (ref.current != null) rect.current = ref.current.getBoundingClientRect();
        }
    })

    const [resizeMode, setResizeMode] = useState<string>("none");

    const handleMouseDown = (event: any) => {
        event.stopPropagation();
        if (rect.current && ref.current) {
            // top right
            if (event.clientX > rect.current.right - 6 && event.clientY < rect.current.top + 6) {
                ref.current.style.cursor = "ne-resize";
                setResizeMode("top-right");
            }

            // bottom right
            else if (event.clientX > rect.current.right - 6 && event.clientY > rect.current.bottom - 6) {
                ref.current.style.cursor = "se-resize";
                setResizeMode("bottom-right");
            }

            // bottom left
            else if (event.clientX < rect.current.left + 6 && event.clientY > rect.current.bottom - 6) {
                ref.current.style.cursor = "sw-resize";
                setResizeMode("bottom-left");
            }

            // top left
            else if (event.clientX < rect.current.left + 6 && event.clientY < rect.current.top + 6) {
                ref.current.style.cursor = "nw-resize";
                setResizeMode("top-left");
            }

            // right
            else if (event.clientX > rect.current.right - 6 ) {
                ref.current.style.cursor = "e-resize";
                setResizeMode("right");
            }

            // bottom
            else if (event.clientY > rect.current.bottom - 6) {
                ref.current.style.cursor = "s-resize";
                setResizeMode("bottom");
            }

            // left
            else if (event.clientX < rect.current.left + 6) {
                ref.current.style.cursor = "w-resize";
                setResizeMode("left");
            }

            // top
            else if (event.clientY < rect.current.top + 6) {
                ref.current.style.cursor = "n-resize";
                setResizeMode("top");
            }

            // else
            else {
                ref.current.style.cursor = "auto";
            }
        }
    }

    useEffect(() => {
        const handleGlobalMouseUp = (event: any) => {
            setResizeMode("none");
            if (ref.current != null) rect.current = ref.current.getBoundingClientRect();
        }

        window.addEventListener("mouseup", handleGlobalMouseUp);

        return () => {window.removeEventListener("mouseup", handleGlobalMouseUp)}

    }, [resizeMode]);

    useEffect(() => {

        const handleGlobalMouseMove = (event: any) => {
            if (maximized) {return}
            if (ref.current && rect.current && resizeMode !== "none") {
                switch (resizeMode) {
                    case "left":
                        ref.current.style.left = `${event.clientX}px`;
                        break;
                    case "right":
                        ref.current.style.right = `calc(100% - ${event.clientX}px)`;
                        break;
                    case "top":
                        ref.current.style.top = `${event.clientY}px`;
                        break;
                    case "bottom":
                        ref.current.style.bottom = `calc(100% - ${event.clientY}px)`;
                        break;
                    case "top-left":
                        ref.current.style.top = `${event.clientY}px`;
                        ref.current.style.left = `${event.clientX}px`;
                        break;
                    case "top-right":
                        ref.current.style.top = `${event.clientY}px`;
                        ref.current.style.right = `calc(100% - ${event.clientX}px)`;
                        break;
                    case "bottom-left":
                        ref.current.style.left = `${event.clientX}px`;
                        ref.current.style.bottom = `calc(100% - ${event.clientY}px)`;
                        break;
                    case "bottom-right":
                        ref.current.style.bottom = `calc(100% - ${event.clientY}px)`;
                        ref.current.style.right = `calc(100% - ${event.clientX}px)`;
                        break;
                }
            }
        };

        window.addEventListener("mousemove", handleGlobalMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove)
        }
    }, [ref, resizeMode, maximized]);

    const handleMouseMove = (event: any) => {
        if (rect.current && ref.current && resizeMode === "none") {
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
        <div style={{...props.style, ...style, right: `calc(100% - ${props.width})`, bottom: `calc(100% - ${props.height})`, top: 0, left: 0}}
             onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onLoad={handleLoad} className="window" ref={(el: any) => {
            ref.current = el;
            setNodeRef(el)
        }}>
            {resizeMode != "none" && <div className="overlay"></div>}
            <div className="window-head" {...listeners} {...attributes}>
                <div className="window-head-id">
                    {props.icon && <img src={props.icon}/>}
                    <p>{props.title}</p>
                </div>
                <div className="navbar-buttons">
                    <NavbarButton icon={maximized ? MaximizedIcon : MaximizeIcon} onClick={()=>{setMaximized(oldValue => !oldValue)}}/>
                    <NavbarButton style={{marginLeft: 5}} icon={xSolidIcon} onClick={props.requestClose}/>
                </div>
            </div>
            <div className="window-body">
                {props.children}
            </div>
        </div>
    );
};

export default Window;
