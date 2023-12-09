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

const RenderWindow = ({
                          windowType,
                          minWidth,
                          minHeight,
                          icon,
                          title,
                          width,
                          height,
                          content
                      }: RenderWindowProps) => {

    const {windows, windowsVisible, closeWindow, setWindowsVisible} = useWindows();

    if (windows.indexOf(windowType) === -1) {
        return null;
    }

    const isMinimized = windowsVisible.indexOf(windowType) === -1;

    const handleClose = () => closeWindow(windowType);
    const handleMinimize = () => setWindowsVisible(oldValue => oldValue.filter(x => x !== windowType));

    return (
        <Window
            minimized={isMinimized}
            minWidth={minWidth}
            minHeight={minHeight}
            icon={icon}
            title={title}
            width={width}
            height={height}
            requestClose={handleClose}
            requestMinimize={handleMinimize}
        >
            {content}
        </Window>
    );
}

export default RenderWindow;
