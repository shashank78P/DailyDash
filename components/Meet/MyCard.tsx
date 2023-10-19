import { useCallback, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { userType } from "../store/types/userType";
import { toast } from "react-toastify";

const MyCard = ({ stream, setRemoteStream, joined, setStream, myVideo, opponent }: any) => {
    const userSelector: userType = useSelector((state: any) => state?.userSliceReducer);
    const { socket, myPeer }: any = useContext(SocketContext);
    const videoRef = useRef<HTMLVideoElement>(null);

    // useEffect(() => {
    //     if (myPeer && stream) {
    //         joined.forEach(peerId => {
    //             var call = myPeer?.call(peerId, stream);
    //             call.on('stream', function (remoteStream: MediaStream) {
    //                 console.log("getting stream")
    //                 setRemoteStream(remoteStream)
    //             })
    //         });
    //     }
    // }, [myPeer])

    useEffect(() => {
        if (socket && myPeer) {

            socket?.on("1-notification", (data: any) => {
                console.log(data?.userId + " joined meeting ")
                toast.success(data?.userId + " joined meeting ")
                if (userSelector?.userId != data?.userId) {
                    // var conn = myPeer.connect(data?.userId);
                    // console.log(conn)
                    console.log(myPeer)
                    const call = myPeer.call(data?.userId, stream)
                    // setJoined([...joined, data?.userId])
                    console.log(call)
                    call.on('stream', function (remoteStream: MediaStream) {

                        console.log(remoteStream)
                    });
                }
            })

            myPeer?.on("call", (call: any) => {
                console.log("got call and answered")
                console.log(call)
                call.answer(stream)
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log(remoteStream)
                });
            })
        }

        return () => {
            socket?.off("1-notification", (data: any) => { })
        }
    }, [myPeer, socket])

    useEffect(() => {
        if (socket && myPeer) {
            myPeer.on('call', function (call: any) {
                call.answer(stream);
                setStream(stream)
                if (myVideo.current) {
                    // var myVideo = opponent?.current
                    myVideo.current.srcObject = stream;
                } else {
                    console.log("my video current null")
                }
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log("opponent stream");
                    setRemoteStream(remoteStream)
                    if (opponent.current) {
                        opponent.current.srcObject = remoteStream;
                    } else {
                        console.log(" opponent current null");
                    }
                });
            });
        }
    }, [socket, myPeer])


    const makeCall = () => useCallback(()=>{
            joined.map((id : any) => {
                if (id == userSelector?.userId) return;
                var call = myPeer.call(id, stream);
                setStream(stream)
                if (myVideo.current) {
                    // var myVideo = opponent?.current
                    myVideo.current.srcObject = stream;
                } else {
                    console.log("my video current null")
                }
                call.on('stream', function (remoteStream: MediaStream) {
                    console.log("opponent stream via makecall", remoteStream)
                    setRemoteStream(remoteStream)
                    if (opponent.current) {
                        opponent.current.srcObject = remoteStream;
                    } else {
                        console.log("opponent current null")
                    }
                });
            })
    },[])


    // if (!stream) {
    //     return null;
    // }
    return (
        <>
            {/* <div className="w-[250px] h-[250px] absolute bottom-5 right-5 border rounded-full overflow-hidden  "> */}
            <button
                onClick={()=>{
                    makeCall()
                }}
            >Call</button>
            <video ref={videoRef}
                className="w-[400px] h-[250px] my-2 mx-auto"
                controls
                autoPlay />
            {/* </div> */}
        </>
    )
};

export default MyCard