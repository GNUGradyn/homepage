import { createContext } from 'react';
import {CoordinatesMap} from "../models/CoordinatesMap";

interface DraggablesContextProps {
    map: CoordinatesMap
    setMap: (value: CoordinatesMap) => void
}

export const DraggablesContext = createContext<DraggablesContextProps>({
    map: {},
    setMap: (value: React.SetStateAction<CoordinatesMap>) => {}
});
