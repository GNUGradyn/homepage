import "./Window.css"
import {CSSProperties} from "react";

interface WindowProps {
    title: string
    children: React.ReactNode
    width: string
    height: string
    style?: CSSProperties
}

const Window: React.FC<WindowProps> = (props: WindowProps) => {
    return (
        <div style={{...props.style, width: props.width, height: props.height}} className="window" draggable={true}>
            <div className="window-head">
                <p>{props.title}</p>
            </div>
            {props.children}
        </div>
    );
};

export default Window;