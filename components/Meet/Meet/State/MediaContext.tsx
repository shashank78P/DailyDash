import { createContext } from "react";
import { streamContextDto } from "../../types";

const MediaContext = createContext<streamContextDto | any>({})
export default MediaContext