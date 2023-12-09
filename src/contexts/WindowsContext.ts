import React, { createContext } from 'react';
import {Windows} from "../models";

interface WindowsContextProps {
    windows: Windows[]
    setWindows: (value: React.SetStateAction<Windows[]>) => void
    windowsVisible: Windows[]
    setWindowsVisible: (value: React.SetStateAction<Windows[]>) => void
}

export const WindowsContext = createContext<WindowsContextProps>({
    windows: [],
    setWindows: (value: React.SetStateAction<Windows[]>) => {},
    windowsVisible: [],
    setWindowsVisible: (value: React.SetStateAction<Windows[]>) => {}
});
