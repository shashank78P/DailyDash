import React, { useState , createContext, ReactNode} from 'react'

interface Props{
    children : ReactNode
}
export let meetingContext : any = null;

const MeetState = ({children} : Props) => {
 meetingContext = createContext({});
const [createMeeting , setCreateMeeting] = useState(true);
  return (
    <>
      <meetingContext.Provider value={{
        createMeeting , 
        setCreateMeeting
      }}>
        {
            children
        }
      </meetingContext.Provider>
    </>
  )
}

export default MeetState
