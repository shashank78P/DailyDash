import { createContext } from "react";
import { BookMarkContextDto } from "../types";


const BookMarkContext = createContext<BookMarkContextDto | any>({})
export default BookMarkContext