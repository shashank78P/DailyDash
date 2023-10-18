import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { userType } from "../store/types/userType";

const MyCard = ({ stream }: { stream: MediaStream | null }) => {
    const userSelector: userType = useSelector((state: any) => state?.userSliceReducer);
    const socket: any = useContext(SocketContext);
    const videoRef = useRef<HTMLVideoElement>(null);
    console.log(stream)

    useEffect(() => {
        if (videoRef.current && stream) {
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
                autoPlay />
            {/* </div> */}
        </>
    )
};

export default MyCard