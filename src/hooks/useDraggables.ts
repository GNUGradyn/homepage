import { useContext } from "react";
import {DraggablesContext} from "../contexts/DraggablesContext";


const useAlerts = () => {
    const {map, setMap} = useContext(DraggablesContext);

    return { map, setMap };
}

export default useAlerts;