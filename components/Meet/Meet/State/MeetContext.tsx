import { createContext } from "react";
import { MeetingContext } from "../../types";


const MeetContext = createContext<MeetingContext | any>({})
export default MeetContext