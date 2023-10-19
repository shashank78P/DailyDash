import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { SocketContext } from './SocketContext';
import { useSelector } from 'react-redux';
import Peer from 'peerjs';

const SocketProvider = (props : any) => {
    const userSelector = useSelector((state : any) => state?.userSliceReducer);
    const [myPeer, setMyPeer] = useState<Peer>()
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

    useEffect(() => {
        if (userSelector?.userId) {
            // @ts-ignore
            const peer = new Peer(userSelector?.userId);
            peer.on("open", (id)=>{
                console.log("peerId => "+id)
            })
            setMyPeer(peer)
        }
    }, [userSelector?.userId])

    // @ts-ignore
    const socket = userSelector?.userId && userSelector?.userId !== 'undefined' && io.connect(String("http://localhost:3001/polls"), options);
    

    return (
        <SocketContext.Provider value={{socket , myPeer}}>
            {props?.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
