import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

// enum statusDto {
//     "recording", "stopping", "stopped", "paused" ,"error"
// }

const UseMediaController = () => {
    const [myStream, setMyStream] = useState<MediaStream>();
    const [mediaUrl, setMediaUrl] = useState<any>([]);
    const [isPlay, setIsPlay] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [Navigator, setNavigator] = useState<any>();
    const [status, setStatus] = useState<String>("stopped");
    const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<any>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window?.navigator) {
            setNavigator(window?.navigator)
            console.log(window?.navigator)
        }
    }, [])

    const stopRecording = async () => {
        try {
            console.log("stopping")
            if (!myStream) return;
            const tracks = myStream?.getTracks()
            tracks?.map((track, i) => {
                track.stop()
            })
        } catch (err: any) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    const pauseRecording = () => {
        try {
            console.log("pause")
            if (mediaRecorder) {
                setStatus("paused")
                mediaRecorder?.pause()
            }
            setIsPlay(false)
        } catch (err: any) {
            toast.error(err?.message)
        }
    }

    const MuteAudio = () => {
        try {
            console.log("mute audio")
            if (!myStream) return;
            const tracks = myStream?.getTracks()
            tracks?.map((track: MediaStreamTrack, i) => {
                if (track?.kind === "audio") {
                    track.enabled = false;
                }
            })
            setIsAudioMuted(true)
        } catch (err: any) {
            console.log(err)
            toast.error(err?.message)
        }
    }
    const unMuteAudio = () => {
        try {
            console.log("un-mute audio")
            if (!myStream) return;
            const tracks = myStream?.getTracks()
            tracks?.map((track: MediaStreamTrack, i) => {
                console.log(track)
                if (track?.kind === "audio") {
                    track.enabled = true;
                }
            })
            setIsAudioMuted(false)
        } catch (err: any) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    const resumeRecording = () => {
        try {
            if (mediaRecorder) {
                console.log("resume")
                mediaRecorder?.resume()
                setStatus("resumed")
                setIsPlay(true)
            }
        } catch (err: any) {
            toast.error(err?.message)
        }
    }

    const handelOnDataAvailable = (event: any, chunk: any[]) => {
        if (event.data.size > 0) {
            chunk.push(event.data)
        }
    }

    const clearBlobUrl = () => {
        mediaUrl?.map((mediaBlobUrl: any) => {
            window.URL.revokeObjectURL(mediaBlobUrl)
        })
        setMediaUrl([])
        setIsStarted(false)
        setIsPlay(false)
    }

    const startRecording = useCallback(async (isVideoOn: boolean, isAudioOn: boolean, isFrontCamera?: boolean, recordType?: string) => {
        try {
            if (Navigator) {
                // var getUserMedia = Navigator.getUserMedia || Navigator.webkitGetUserMedia || Navigator.mozGetUserMedia;
                navigator.mediaDevices.getDisplayMedia
                // @ts-ignore
                var getUserMedia = navigator.mediaDevices.getUserMedia || Navigator.webkitGetUserMedia || Navigator.mozGetUserMedia;
                var stream;

                if (recordType && recordType == "screen") {
                    stream = await navigator.mediaDevices.getDisplayMedia({ video: true, });
                } else {
                    stream = await getUserMedia({ video: isVideoOn ? { facingMode: !isFrontCamera ? 'environment' : 'user' } : isVideoOn, audio: isAudioOn })
                }
                if (!stream) return;
                setMyStream(stream)
                const tracks = stream.getAudioTracks()
                if (Array.isArray(tracks)) {
                    tracks?.map((track, i) => {
                        track.onmute = (e) => {
                            console.log("onmute")
                            console.log(e)
                            setIsAudioMuted(true);
                            setIsPlay(false)
                        }
                        track.onunmute = (e) => {
                            console.log("onunmute")
                            console.log(e)
                            setIsAudioMuted(false);
                            setIsPlay(true)
                        }
                    })
                }
                setStatus("started")
                setIsStarted(true)
                setIsPlay(true)
                const recorder = new MediaRecorder(stream)
                setMediaRecorder(recorder);
                let chunk: any = []
                recorder.ondataavailable = (event) => {
                    handelOnDataAvailable(event, chunk)
                }

                recorder.onstop = () => {
                    const blob = new Blob(chunk, {
                        type: `${(!isVideoOn && isAudioOn) && "audio"}${isVideoOn && "video"}/webm;codecs=vp9`,
                    })

                    chunk = []
                    const blobUrl = URL.createObjectURL(blob)
                    console.log(blobUrl)
                    setMediaUrl((prev: any[]) => [...prev, blobUrl])
                    setStatus("stopped")
                    setIsStarted(false)
                    setIsPlay(false)
                }

                recorder.start(200)
            }
        }
        catch (err: any) {
            setStatus("stopped")
            setIsStarted(false)
            setIsPlay(false)
            console.log(err?.message)
            toast.error("Not supported")
        }
    }, [Navigator])

    return [myStream, startRecording, mediaUrl, setMediaUrl, stopRecording, status, pauseRecording, resumeRecording, clearBlobUrl, MuteAudio, unMuteAudio, isAudioMuted, setIsAudioMuted, isPlay, setIsPlay
        , isStarted, setIsStarted]

}

export default UseMediaController
