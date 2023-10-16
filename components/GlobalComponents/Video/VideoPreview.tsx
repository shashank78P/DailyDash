import { useEffect, useRef } from "react";

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    console.log(stream)

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    if (!stream) {
        return null;
    }
    return (
        <>
            <div className="w-[250px] h-[250px] absolute bottom-5 right-5 border rounded-full overflow-hidden  ">
                <video ref={videoRef} className="w-[250px] h-[250px] rounded-full overflow-hidden object-center" autoPlay />;
            </div>
        </>
    )
};

export default VideoPreview