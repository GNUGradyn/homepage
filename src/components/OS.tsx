import React, {useEffect, useRef, useState} from "react"
import './OS.css'
import Window from './Window'
import StartMenu from "./StartMenu";
import DesktopIcon from "./DesktopIcon";
import {ClientRect, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {produce} from "immer"
import {DraggablesContext} from "../contexts/DraggablesContext";
import {Windows} from "../models";
import TaskbarIcon from "./TaskbarIcon";
import ContactMeWindow from "./ContactMeWindow";

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);
    const [showTaskbar, setShowTaskbar] = useState(false);
    const [startMenuVisible, setStartMenuVisible] = useState(false);
    const [windows, setWindows] = useState<Windows[]>([]);
    const [windowsVisible, setWindowsVisible] = useState<Windows[]>([]);

    const openWindow = (window: Windows) => {
        setWindows(oldValue => [...oldValue, window]);
        setWindowsVisible(oldValue => [...oldValue, window]);
    }

    const closeWindow = (window: Windows) => {
        setWindows(oldValue => oldValue.filter(x => x != window));
        setWindowsVisible(oldValue => oldValue.filter(x => x != window));
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
                            <DesktopIcon name={"Contact Me"} icon={require("../assets/outlook_express-3.png")} onClick={()=>{openWindow(Windows.Contact)}}/>
                            <DesktopIcon name={"Virtual Box"} icon={require("../assets/Virtualbox_logo.png")} onClick={()=>{openWindow(Windows.VirtualBox)}}/>
                            {isWindowVisible(Windows.Resume) && <Window minWidth={"260px"} minHeight={"260px"} icon={require("../assets/document_icon.png")} title={"Resume"} width={"40vw"} height={"60vh"} requestClose={() => {closeWindow(Windows.Resume)}} requestMinimize={() => {setWindowsVisible(oldValue => oldValue.filter(x => x != Windows.Resume))}}>
                                <object type="application/pdf" data={require("../assets/resume.pdf")} width={"100%"} height={"100%"}/>
                            </Window>}
                            {isWindowVisible(Windows.Contact) && <Window minWidth={"260px"} minHeight={"260px"} icon={require("../assets/message_envelope_open-0.png")} title={"Contact Me"} width={"15vw"} height={"60vh"} requestClose={() => {closeWindow(Windows.Contact)}} requestMinimize={() => {setWindowsVisible(oldValue => oldValue.filter(x => x != Windows.Contact))}}>
                                <ContactMeWindow/>
                            </Window>}
                            {isWindowVisible(Windows.VirtualBox) && <Window minWidth={"260px"} minHeight={"260px"} icon={require("../assets/Virtualbox_logo.png")} title={"Virtual Box [Running GradynOS]"} width={"40vw"} height={"60vh"} requestClose={() => {closeWindow(Windows.VirtualBox)}} requestMinimize={() => {setWindowsVisible(oldValue => oldValue.filter(x => x != Windows.VirtualBox))}}>
                                <iframe src={window.location.href} width={"100%"} height={"100%"}/>
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
                    {windows.indexOf(Windows.Resume) > -1 && <TaskbarIcon onclick={()=>{toggleWindowVisible(Windows.Resume)}} icon={require("../assets/document_icon.png")} name={"Resume"} open={isWindowVisible(Windows.Resume)}/>}
                    {windows.indexOf(Windows.Contact) > -1 && <TaskbarIcon onclick={()=>{toggleWindowVisible(Windows.Contact)}} icon={require("../assets/message_envelope_open-0.png")} name={"New Message"} open={isWindowVisible(Windows.Contact)}/>}
                    {windows.indexOf(Windows.VirtualBox) > -1 && <TaskbarIcon onclick={()=>{toggleWindowVisible(Windows.VirtualBox)}} icon={require("../assets/Virtualbox_logo.png")} name={"Virtual Box"} open={isWindowVisible(Windows.VirtualBox)}/>}
                    {startMenuVisible && <StartMenu openWindow={(window: Windows) => {openWindow(window); setStartMenuVisible(false)}} ref={startMenuRef}/>}
                </div>}
            </div>
            :
            <div id="loading" onClick={() => {
                setLoaded(true)
            }}>
                {startupWindowVisible && <div>
                    <DndContext>
                        <Window isRelative minHeight={"0px"}  minWidth={"0px"} requestMinimize={()=>{}} title="Starting Up" height={"50vh"} width={"20vw"} style={{position: "relative", height: "50vh", width: "20vw"}} requestClose={() => {}}>
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
