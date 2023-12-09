import Window from "./Window";
import React, {ReactNode} from "react";
import {Windows} from "../models";
import useWindows from "../hooks/useWindows";

interface RenderWindowProps {
    windowType: Windows
    minWidth: string
    minHeight: string
    icon: string
    title: string
    width: string
    height: string
    content: ReactNode
}

const RenderWindow = (props: RenderWindowProps) => {

    const {windows, windowsVisible, closeWindow, setWindowsVisible} = useWindows();

    if (windows.indexOf(props.windowType) === -1) {
        return null;
    }

    const isMinimized = windowsVisible.indexOf(props.windowType) === -1;

    const handleClose = () => closeWindow(props.windowType);
    const handleMinimize = () => setWindowsVisible(oldValue => oldValue.filter(x => x !== props.windowType));

    return (
        <Window
            minimized={isMinimized}
            minWidth={props.minWidth}
            minHeight={props.minHeight}
            icon={props.icon}
            title={props.title}
            width={props.width}
            height={props.height}
            requestClose={handleClose}
            requestMinimize={handleMinimize}
        >
            {props.content}
        </Window>
    );
}

export default RenderWindow;
