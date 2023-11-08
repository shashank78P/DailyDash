import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

// enum statusDto {
//     "recording", "stopping", "stopped", "paused" ,"error"
// }

const UseMediaController = () => {
    const [myStream, setMyStream] = useState<MediaStream>();
    const [mediaUrl, setMediaUrl] = useState<any>([]);
    const [Navigator, setNavigator] = useState<any>();
    const [status, setStatus] = useState<String>("stopped");

    useEffect(() => {
        if (typeof window !== 'undefined' && window?.navigator) {
            setNavigator(window?.navigator)
            console.log(window?.navigator)
        }
    }, [])

    const stopRecording = async () => {
        try {
            if (!myStream) return;

            const tracks = myStream?.getTracks()
            // const stream = myStream.Readable()
            // const blob = await streamToBlob(myStream)
            // console.log(blob)
            // setMediaUrl(blob)

            setStatus("stopped")
            tracks?.map((track, i) => {
                track.stop()
            })
        } catch (err: any) {
            console.log(err)
            toast.error(err)
        }
    }

    const pauseRecording = useCallback((isAudioOff: boolean, isVideoOff: boolean) => {
        try {
            setStatus("paused")
            if (isAudioOff) {
                const tracks = myStream?.getAudioTracks()
                tracks?.map((track, i) => {
                    track.enabled = false
                })
            }
            if (isVideoOff) {
                const tracks = myStream?.getAudioTracks()
                tracks?.map((track, i) => {
                    track.enabled = false
                })
            }

        } catch (err: any) {
            toast.error(err?.message)
        }
    }, [myStream])

    const resumeRecording = useCallback((isAudioOff: boolean, isVideoOff: boolean) => {
        try {
            setStatus("resumed")
            if (isAudioOff) {
                const tracks = myStream?.getAudioTracks()
                tracks?.map((track, i) => {
                    track.enabled = true
                })
            }
            if (isVideoOff) {
                const tracks = myStream?.getAudioTracks()
                tracks?.map((track, i) => {
                    track.enabled = true
                })
            }
        } catch (err: any) {
            toast.error(err?.message)
        }
    }, [myStream])

    const handelCreateBlobUrl = useCallback((isVideoOn: boolean, isAudioOn: boolean, chunk: any[]) => {
        if (status == "stopped") {
            const blob = new Blob(chunk, {
                type: `${isAudioOn && "audio"}${isVideoOn && "video"}/webm;codecs=vp9`,
            })

            chunk = []
            const blobUrl = URL.createObjectURL(blob)
            console.log(blobUrl)
            setMediaUrl((prev: any[]) => [...prev, blobUrl])
        }
        return chunk;

    }, [status])

    const handelOnDataAvailable = useCallback((event: any, chunk: any[]) => {
        if (event.data.size > 0) {
            console.log(status)
            // if (status != "started") {

            // }
            if (status == "started" || status == "resumed") {
                chunk.push(event.data)
            }
        }
    }, [status])

    const startRecording = useCallback((isVideoOn: boolean, isAudioOn: boolean) => {
        try {

            // @ts-ignore
            var getUserMedia = Navigator.getUserMedia || Navigator.webkitGetUserMedia || Navigator.mozGetUserMedia;
            console.log(Navigator)
            console.log(getUserMedia)
            getUserMedia({ video: isVideoOn, audio: isAudioOn }, function (stream: MediaStream) {
                setMyStream(stream)
                setStatus("started")
                const recorder = new MediaRecorder(stream)
                let chunk: any = []
                recorder.ondataavailable = (event) => {
                    handelOnDataAvailable(event, chunk)
                }

                // recorder.pause()

                // recorder.resume()

                recorder.onstop = () => {
                    // chunk = handelCreateBlobUrl(isVideoOn , isAudioOn , chunk)
                    const blob = new Blob(chunk, {
                        type: `${isAudioOn && "audio"}${isVideoOn && "video"}/webm;codecs=vp9`,
                    })

                    chunk = []
                    const blobUrl = URL.createObjectURL(blob)
                    console.log(blobUrl)
                    setMediaUrl((prev: any[]) => [...prev, blobUrl])
                }

                recorder.start(200)
            });
        }
        catch (err) {
            toast.error("Not supported")
        }
    }, [Navigator, status])

    return [myStream, startRecording, mediaUrl, setMediaUrl, stopRecording, status, pauseRecording, resumeRecording]

}

export default UseMediaController
