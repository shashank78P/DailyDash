import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { userType } from "../store/types/userType";
import { toast } from "react-toastify";

const MyCard = ({ stream, setRemoteStream, joined }: { stream: MediaStream | null, setRemoteStream: any, joined: string[] }) => {
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
                if(userSelector?.userId != data?.userId){
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
        if (videoRef.current && stream) {
            console.log(stream)
            // setStream(stream)
            videoRef.current.srcObject = stream;


            // const streamTrack = stream.getVideoTracks()[0];
            // console.log(stream.getVideoTracks())
            // console.log("stream track")
            // console.log(streamTrack)
            // // const streamBlob = new MediaStream([streamTrack]);
            // console.log("stream blob")
            // console.log(streamTrack?.blob())
            // const reader = new FileReader();
            // @ts-ignore
            // reader.readAsDataURL(streamBlob);
            // new Promise((resolve, reject) => {
            //     reader.onload = () => {
            //         resolve(reader.result);
            //     };
            //     reader.onerror = error => reject(error);
            // });
            console.log(videoRef.current.srcObject)
            socket?.emit("1", { ...videoRef.current.srcObject, userId: userSelector?.userId, meetingId: "1" })
        }
    }, [stream]);
    if (!stream) {
        return null;
    }
    return (
        <>
            {/* <div className="w-[250px] h-[250px] absolute bottom-5 right-5 border rounded-full overflow-hidden  "> */}
            <video ref={videoRef}
                className="w-[400px] h-[250px] my-2 mx-auto"
                controls
                autoPlay />
            {/* </div> */}
        </>
    )
};

export default MyCard