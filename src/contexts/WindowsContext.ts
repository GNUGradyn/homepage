import React, { createContext } from 'react';
import {Windows} from "../models";

interface WindowsContextProps {
    windows: Windows[]
    setWindows: (value: React.SetStateAction<Windows[]>) => void
    windowsVisible: Windows[]
    setWindowsVisible: (value: React.SetStateAction<Windows[]>) => void
    windowsCovered: string[]
    setWindowsCovered: (value: React.SetStateAction<string[]>) => void
}

export const WindowsContext = createContext<WindowsContextProps>({
    windows: [],
    setWindows: (value: React.SetStateAction<Windows[]>) => {},
    windowsVisible: [],
    setWindowsVisible: (value: React.SetStateAction<Windows[]>) => {},
    windowsCovered: [],
    setWindowsCovered: (value: React.SetStateAction<string[]>) => {}
});
