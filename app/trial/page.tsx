"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function Page(prop: any) {
    const [myStream, setMyStream] = useState<MediaStream | null>()
    const [isScreenShare, setIsScreenShare] = useState<boolean>()
    const ref : any = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (ref?.current) {
            console.log({ myStream })
            ref.current.srcObject = myStream
        }
    }, [myStream])

    const startScreenShare = useCallback(async () => {
        try{
            // @ts-ignore
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" }, audio: false })
            return stream
        }catch(err : any){
            toast.error(err?.message ?? "Not supported")
        }
    }, [])

    useEffect(() => {
        if (isScreenShare) {
            startScreenShare().then(stream => {
                const combined = new MediaStream()
                console.log(combined?.getTracks())
                const tracks = stream?.getTracks()
                tracks?.map((track, i)=>{
                    combined.addTrack(track)
                })
                console.log(combined?.getTracks())
            });
        }
    }, [startScreenShare, isScreenShare])
    return (
        <>
            <div>
                <h1>trial</h1>
                <button onClick={() => {
                    setIsScreenShare(true)
                }}>start</button>
                <button onClick={() => {
                    stop()
                }}>Stop</button>
                <video ref={ref} width={500} height={250} autoPlay controls />
            </div>
        </>
    )
}

