import React from 'react'
import io from 'socket.io-client';
import { SocketContext } from './SocketContext';
import { useSelector } from 'react-redux';

const SocketProvider = (props : any) => {
    const userSelector = useSelector((state : any) => state?.userSliceReducer);
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
        auth: {
            userId: userSelector?.userId,
            loginId: userSelector?.logInId,
        },
    };

    // @ts-ignore
    const socket = userSelector?.userId && userSelector?.userId !== 'undefined' && io.connect(String("http://localhost:3001/polls"), options);
    socket?.on("userDisconnected", (data: any) => {

    });

    return (
        <SocketContext.Provider value={socket}>
            {props?.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
