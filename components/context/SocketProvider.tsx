import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { SocketContext } from './SocketContext';
import { useSelector } from 'react-redux';
import Peer from 'peerjs';

const SocketProvider = (props: any) => {
    const userSelector = useSelector((state: any) => state?.userSliceReducer);
    const [myPeer, setMyPeer] = useState<Peer>()
    const [myScreenPeer, setMyScreenPeer] = useState<Peer>()
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
        if (typeof window !== 'undefined' && userSelector?.userId && window?.navigator) {
            const peer = new Peer(userSelector?.userId);
            const screenSharePeer = new Peer(`${userSelector?.userId}-screen-share`);
            peer.on("open", (id) => {
                console.log("peerId => " + id)
            })
            screenSharePeer.on("open", (id) => {
                console.log("screen share peerId => " + id)
            })
            setMyPeer(peer)
            setMyScreenPeer(screenSharePeer)
        }
    }, [userSelector?.userId])

    // @ts-ignore
    const socket = userSelector?.userId && userSelector?.userId !== 'undefined' && io.connect(String("http://localhost:3001/polls"), options);


    return (
        <SocketContext.Provider value={{ socket, myPeer , myScreenPeer}}>
            {props?.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
