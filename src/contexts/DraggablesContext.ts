import React, { createContext } from 'react';
import {ClientRect} from "@dnd-kit/core";

interface DraggablesContextProps {
    map: {[key: string]: ClientRect}
    setMap: (value: {[key: string]: ClientRect}) => void
}

export const DraggablesContext = createContext<DraggablesContextProps>({
    map: {},
    setMap: (value: React.SetStateAction<{[key: string]: ClientRect}>) => {}
});
