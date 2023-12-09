import { useContext } from "react";
import {WindowsContext} from "../contexts/WindowsContext";
import {Windows} from "../models";
import {produce} from "immer";


const useWindows = () => {
    const {windows, setWindows, windowsVisible, setWindowsVisible, windowsCovered, setWindowsCovered} = useContext(WindowsContext);

    const openWindow = (window: Windows) => {
        setWindows((oldValue: Windows[]) => [...oldValue, window]);
        setWindowsVisible((oldValue: Windows[]) => [...oldValue, window]);
    }

    const closeWindow = (window: Windows) => {
        setWindows(oldValue => oldValue.filter(x => x != window));
        setWindowsVisible((oldValue: Windows[]) => oldValue.filter(x => x != window));
    }

    const isWindowVisible = (window: Windows) => {
        return windows.indexOf(window) > -1 && windowsVisible.indexOf(window) > -1;
    }

    const toggleWindowVisible = (window: Windows) => {
        if (isWindowVisible(window)) {
            setWindowsVisible(oldValue => oldValue.filter(x => x != window));
        } else {
            setWindowsVisible(oldValue => [...oldValue, window])
        }
    }

    const focusWindow = (window: Windows) => {
        const result = produce(windows, draft => {
            draft.push(draft.splice(draft.indexOf(window), 1)[0]);
        })
        setWindows(result);
    }

    return { windows, setWindows, openWindow, closeWindow, toggleWindowVisible, windowsVisible, setWindowsVisible, isWindowVisible, windowsCovered, setWindowsCovered, focusWindow };
}

export default useWindows;
