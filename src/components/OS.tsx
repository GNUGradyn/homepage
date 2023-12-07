import React, {useCallback, useEffect, useRef, useState} from "react"
import './OS.css'
import Window from './Window'
import StartMenu from "./StartMenu";
import DesktopIcon from "./DesktopIcon";
import {ClientRect, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {produce} from "immer"
import {DraggablesContext} from "../contexts/DraggablesContext";
import {Windows} from "../models";

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);
    const [showTaskbar, setShowTaskbar] = useState(false);
    const [startMenuVisible, setStartMenuVisible] = useState(false);
    const [windows, setWindows] = useState<Windows[]>([]);

    const openWindow = (window: Windows) => {
        setWindows(oldValue => [...oldValue, window]);
    }

    const [draggablePositions, setDraggablePositions] = useState<{[key: string]: ClientRect}>({});

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

    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 15}})
    const sensors = useSensors(mouseSensor);

    return (
        loaded ?
            <div id="OS">
                <DndContext sensors={sensors} onDragEnd={(event: DragEndEvent) => {
                    const result = produce(draggablePositions, draft => {
                        draft[event.active.id] = event.active.rect.current.translated ?? new DOMRect(0, 0, 0, 0);
                    })
                    setDraggablePositions(result);
                }}>
                    <DraggablesContext.Provider value={{map: draggablePositions, setMap: setDraggablePositions}}>
                        <div id="desktop">
                            <DesktopIcon name={"Resume"} icon={require("../assets/document_icon.png")} onClick={()=>{openWindow(Windows.Resume)}}/>
                            {windows.indexOf(Windows.Resume) > -1 && <Window icon={require("../assets/document_icon.png")} title={"Resume"} width={"40vw"} height={"60vh"}>
                                <object type="application/pdf" data={require("../assets/resume.pdf")} width={"100%"} height={"100%"}/>
                            </Window>}
                        </div>
                    </DraggablesContext.Provider>
                </DndContext>
                {showTaskbar && <div id="taskbar">
                    <div id="start-button" onClick={()=>{setStartMenuVisible((prevState: boolean) => !prevState)}}>
                        <div style={{width: 70}}>
                            <img id="start-icon" src={require("../assets/start.png")}/>
                            <p id="start-text" >Start</p>
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
                    <DndContext>
                        <Window title="Starting Up" height={"50vh"} width={"20vw"} style={{position: "relative", height: "50vh", width: "20vw"}}>
                            <div id="startup-window-content">
                                <h1>Starting Gradyn OS</h1>
                                <img id="startup-img" src={require("../assets/gradyn.png")}/>
                            </div>
                        </Window>
                    </DndContext>
                </div>}
            </div>
    )
}

export default OS
