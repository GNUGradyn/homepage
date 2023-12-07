import { createContext } from 'react';
import {CoordinatesMap} from "../components/OS";

interface DraggablesContextProps {
    map: CoordinatesMap
    setMap: (value: CoordinatesMap) => void
}

export const DraggablesContext = createContext<DraggablesContextProps>({
    map: {},
    setMap: (alerts: React.SetStateAction<CoordinatesMap>) => {}
});
