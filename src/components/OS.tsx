import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react"
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
import DosPlayer from "./DosPlayer";
import RenderWindow from "./RenderWindow";
import useWindows from "../hooks/useWindows";
import {findOverlappingKeys} from "../hooks/rects";

const OS = () => {
    const [loaded, setLoaded] = useState(false);
    const [startupWindowVisible, setStartupWindowVisible] = useState(false);
    const [showTaskbar, setShowTaskbar] = useState(false);
    const [startMenuVisible, setStartMenuVisible] = useState(false);
    const [draggablePositions, setDraggablePositions] = useState<{ [key: string]: ClientRect }>({});

    const {openWindow, isWindowVisible, toggleWindowVisible, windows, setWindowsCovered} = useWindows();

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

    useEffect(() => {
        setWindowsCovered(findOverlappingKeys(draggablePositions))
    }, [draggablePositions]);

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
                            <DesktopIcon name={"Resume"} icon={require("../assets/document_icon.png")} onClick={() => {
                                openWindow(Windows.Resume)
                            }}/>
                            <DesktopIcon name={"Contact Me"} icon={require("../assets/outlook_express-3.png")}
                                         onClick={() => {
                                             openWindow(Windows.Contact)
                                         }}/>
                            <DesktopIcon name={"Virtual Box"} icon={require("../assets/Virtualbox_logo.png")}
                                         onClick={() => {
                                             openWindow(Windows.VirtualBox)
                                         }}/>
                            <DesktopIcon name={"DOOM"} icon={require("../assets/Doom.png")} onClick={() => {
                                openWindow(Windows.DOOM)
                            }}/>
                            <RenderWindow
                                windowType={Windows.Resume}
                                minWidth="260px"
                                minHeight="260px"
                                icon={require("../assets/document_icon.png")}
                                title="Resume"
                                width="40vw"
                                height="60vh"
                                content={<object type="application/pdf" data={require("../assets/resume.pdf")} width="100%" height="100%"/>}
                            />
                            <RenderWindow
                                windowType={Windows.Contact}
                                minWidth="260px"
                                minHeight="260px"
                                icon={require("../assets/message_envelope_open-0.png")}
                                title="Contact Me"
                                width="15vw"
                                height="60vh"
                                content={<ContactMeWindow/>}
                            />
                            <RenderWindow
                                windowType={Windows.VirtualBox}
                                minWidth="260px"
                                minHeight="260px"
                                icon={require("../assets/Virtualbox_logo.png")}
                                title="Virtual Box [Running GradynOS]"
                                width="40vw"
                                height="60vh"
                                content={<iframe
                                    src={"https://gradyn.com/?" + (Math.random() + 1).toString(36).substring(7)}
                                    width={"100%"} height={"100%"}/>}
                            />
                            <RenderWindow
                                windowType={Windows.DOOM}
                                minWidth="640px"
                                minHeight="400px"
                                icon={require("../assets/Doom.png")}
                                title="DOOM by ID Software"
                                width="640px"
                                height="400px"
                                content={<DosPlayer bundleUrl="DOOM.jsdos"/>}
                            />
                        </div>
                    </DraggablesContext.Provider>
                </DndContext>
                {showTaskbar && <div id="taskbar">
                    <div id="start-button" onClick={() => {
                        setStartMenuVisible((prevState: boolean) => !prevState)
                    }}>
                        <div style={{width: 70}}>
                            <img id="start-icon" src={require("../assets/start.png")}/>
                            <p id="start-text">Start</p>
                        </div>
                    </div>
                    {windows.indexOf(Windows.Resume) > -1 && <TaskbarIcon onclick={() => {
                        toggleWindowVisible(Windows.Resume)
                    }} icon={require("../assets/document_icon.png")} name={"Resume"}
                                                                          open={isWindowVisible(Windows.Resume)}/>}
                    {windows.indexOf(Windows.Contact) > -1 && <TaskbarIcon onclick={() => {
                        toggleWindowVisible(Windows.Contact)
                    }} icon={require("../assets/message_envelope_open-0.png")} name={"New Message"}
                                                                           open={isWindowVisible(Windows.Contact)}/>}
                    {windows.indexOf(Windows.VirtualBox) > -1 && <TaskbarIcon onclick={() => {
                        toggleWindowVisible(Windows.VirtualBox)
                    }} icon={require("../assets/Virtualbox_logo.png")} name={"Virtual Box"}
                                                                              open={isWindowVisible(Windows.VirtualBox)}/>}
                    {windows.indexOf(Windows.DOOM) > -1 && <TaskbarIcon onclick={() => {
                        toggleWindowVisible(Windows.DOOM)
                    }} icon={require("../assets/Doom.png")} name={"DOOM"} open={isWindowVisible(Windows.DOOM)}/>}
                    {startMenuVisible && <StartMenu openWindow={(window: Windows) => {
                        openWindow(window);
                        setStartMenuVisible(false)
                    }} ref={startMenuRef}/>}
                </div>}
            </div>
            :
            <div id="loading" onClick={() => {
                setLoaded(true)
            }}>
                {startupWindowVisible && <div>
                    <DndContext>
                        <Window isCovered={false} minimized={false} isRelative minHeight={"0px"} minWidth={"0px"} requestMinimize={() => {
                        }} title="Starting Up" height={"50vh"} width={"20vw"}
                                style={{position: "relative", height: "50vh", width: "20vw"}} requestClose={() => {
                        }}>
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
