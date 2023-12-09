import { useContext } from "react";
import {WindowsContext} from "../contexts/WindowsContext";
import {Windows} from "../models";


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

    return { windows, setWindows, openWindow, closeWindow, toggleWindowVisible, windowsVisible, setWindowsVisible, isWindowVisible, windowsCovered, setWindowsCovered };
}

export default useWindows;
