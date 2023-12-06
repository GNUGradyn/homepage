// This component was fun to write -Gradyn

import React, {useEffect, useRef, useState} from "react";

interface DraggableProps {
    children: React.ReactNode
}

const Draggable = (props: DraggableProps) => {

    const [isDragging, setIsDragging] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const onMouseDown = (event: any) => {
        if (ref.current != null) ref.current.style.position = "absolute";
        setIsDragging(true);
    }

    useEffect(() => {

        const handleMouseMove = (event: MouseEvent) => {
            if (ref.current != null) ref.current.style.left = event.x + "px";
            if (ref.current != null) ref.current.style.top = event.y + "px";

        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {window.removeEventListener("mousemove", handleMouseMove)}
    }, []);

    return (
        <div ref={ref} onMouseDown={onMouseDown}>
            {props.children}
        </div>
    )
}

export default Draggable;

