import React, {useCallback, useEffect, useRef, useState} from "react"
import './OS.css'
import Window from './Window'
import StartMenu from "./StartMenu";
import DesktopIcon from "./DesktopIcon";
import {DndContext, DragEndEvent, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {produce} from "immer"
import {DraggablesContext} from "../contexts/DraggablesContext";
import {Windows} from "../models";
import {useSensorSetup} from "@dnd-kit/core/dist/hooks/utilities";

export type CoordinatesMap = {
    [key: string]: {
      x: number;
      y: number;
    };
  };

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);
    const [showTaskbar, setShowTaskbar] = useState(false);
    const [startMenuVisible, setStartMenuVisible] = useState(false);
    const [windows, setWindows] = useState<Windows[]>([]);

    const openWindow = (window: Windows) => {
        setWindows(oldValue => [...oldValue, window]);
    }

    const [draggablePositions, setDraggablePositions] = useState<CoordinatesMap>({});

    useEffect(() => {
        setTimeout(() => {
            setStartupWindowVisible(true);
        }, 1000)
    }, []);

    useEffect(() => {
        if (startupWindowVisible) {
            setTimeout(() => {
                setLoaded(true);
            }, 3000)
        }
    }, [startupWindowVisible]);

    useEffect(() => {
        setTimeout(() => {
            setShowTaskbar(true)
        }, 1000)
    }, [loaded])


    // close the start menu if it's clicked out of
    const startMenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (startMenuRef.current && !startMenuRef.current.contains(e.target)) {
                setStartMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    // Dumb workaround to firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=1868645
    const [startIconWidth, setStartIconWidth] = useState(0);
    const [startTextWidth, setStartTextWidth] = useState(0);

    const iconMeasuredRef: React.RefCallback<HTMLElement> = useCallback((node) => {
        if (node !== null) {
            setStartIconWidth(node.getBoundingClientRect().width);
        }
    }, []);

    const textMeasuredRef: React.RefCallback<HTMLElement> = useCallback((node) => {
        if (node !== null) {
            setStartTextWidth(node.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {

        const handleResize = () => {
            setStartTextWidth(document.getElementById("start-text")?.offsetWidth ?? 0);
            setStartIconWidth(document.getElementById("start-icon")?.offsetWidth ?? 0);
        }

        window.addEventListener('resize', handleResize);
        return () => {

            window.removeEventListener('resize', handleResize);

        };

    }, [showTaskbar]);

    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 15}})
    const sensors = useSensors(mouseSensor);

    return (
        loaded ?
            <div id="OS">
                <DndContext sensors={sensors} onDragEnd={(event: DragEndEvent) => {
                    const result = produce(draggablePositions, draft => {
                        draft[event.active.id] = {
                            x: (draggablePositions[event.active.id]?.x ?? 0) + event.delta.x,
                            y: (draggablePositions[event.active.id]?.y ?? 0) + event.delta.y
                        }
                    })
                    setDraggablePositions(result);
                }}>
                    <DraggablesContext.Provider value={{map: draggablePositions, setMap: setDraggablePositions}}>
                        <div id="desktop">
                            <DesktopIcon name={"Resume"} icon={require("../assets/document_icon.png")} onClick={()=>{openWindow(Windows.Resume)}}/>
                            {windows.indexOf(Windows.Resume) > -1 && <Window title={"Resume"} width={"40vw"} height={"60vh"}>
                                <object type="application/pdf" data={require("../assets/resume.pdf")} width={"100%"} height={"100%"}/>
                            </Window>}
                        </div>
                    </DraggablesContext.Provider>
                </DndContext>
                {showTaskbar && <div id="taskbar">
                    <div id="start-button" onClick={()=>{setStartMenuVisible((prevState: boolean) => !prevState)}}>
                        <div style={{width: startTextWidth + startIconWidth + 5}}>
                            <img id="start-icon" ref={iconMeasuredRef} src={require("../assets/start.png")}/>
                            <p id="start-text" ref={textMeasuredRef}>Start</p>
                        </div>
                    </div>
                    {startMenuVisible && <StartMenu ref={startMenuRef}/>}
                </div>}
            </div>
            :
            <div id="loading" onClick={() => {
                setLoaded(true)
            }}>
                {startupWindowVisible && <div>
                    <Window title="Starting Up" height={"50vh"} width={"20vw"} style={{position: "relative"}}>
                        <div id="startup-window-content">
                            <h1>Starting Gradyn OS</h1>
                            <img id="startup-img" src={require("../assets/gradyn.png")}/>
                        </div>
                    </Window>
                </div>}
            </div>
    )
}

export default OS