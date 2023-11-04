
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot';
import PinIco from '@/components/assets/PinIco';
import UnPinIco from '@/components/assets/UnPinIco';
import React, { useContext, useEffect } from 'react'
import { streamContextDto } from '../../types';
import MediaContext from '../State/MediaContext';

const ParticipantCard = ({ participant, key, isScreenShare }: { participant: any, key: string, isScreenShare: boolean }) => {
    // @ts-ignore
    const { opponentScreenShareStream, pinnedType, setpinnedType, meetingId, opponentNonMediaStreamStream, opponentStream, setShowPinSection, showPinSection, pinnedParticipants, setPinnedParticipants } = useContext<streamContextDto>(MediaContext)
    function returnImgeContainer(name: string, userPic: string, container: any) {
        let imgTag = document.createElement("img")
        imgTag.setAttribute("alt", name)
        imgTag.setAttribute("src", userPic)
        imgTag.setAttribute("draggable", "false")
        imgTag.setAttribute("class", "w-full h-full object-cover rounded-full overflow-hidden select-none")
        if (container) {
            container.classList.remove("w-full", "h-full");
            container.classList.add("w-[150px]", "h-[150px]");
            container.innerHTML = "";
            container.appendChild(imgTag)
        }
    }

    function returnAudioContainer(stream: MediaStream, container: any) {
        let audioTag = document.createElement("audio")
        audioTag.srcObject = stream;
        audioTag.setAttribute("autoPlay", "true")
        audioTag.setAttribute("class", "disable")
        container.appendChild(audioTag)
    }

    useEffect(() => {
        if (participant?.participantId && meetingId && opponentStream && opponentNonMediaStreamStream) {
            const id = isScreenShare ? `${participant?.participantId}-screen-share-${meetingId}` : `${participant?.participantId}-${meetingId}`
            let container: any = document.getElementById(id)
            if (
                Array.isArray(opponentNonMediaStreamStream) &&
                !opponentNonMediaStreamStream?.includes(participant?.participantId) &&
                Object.keys(opponentStream).includes(participant?.participantId) || isScreenShare
            ) {
                let stream: MediaStream = opponentStream[participant?.participantId]
                let track = stream.getTracks()

                // checking for only audio 
                if (track?.length == 1 && track?.[0]?.kind == "audio") {
                    returnImgeContainer(participant?.name, participant?.userPic, container)
                    returnAudioContainer(opponentStream[participant?.participantId], container)
                } else {
                    let videoTag = document.createElement("video")
                    if (isScreenShare) {
                        console.log("videoTag.srcObject - screen share")
                        // console.log(opponentScreenShareStream[`${participant?.participantId}-screen-share`])
                        // console.log(opponentScreenShareStream[`${participant?.participantId}-screen-share`]?.getTracks())
                        videoTag.srcObject = opponentScreenShareStream[`${participant?.participantId}-screen-share`]
                    } else {
                        console.log("videoTag.srcObject")
                        console.log(opponentStream[participant?.participantId])
                        videoTag.srcObject = opponentStream[participant?.participantId]
                    }
                    videoTag.setAttribute("autoPlay", "true")
                    videoTag.setAttribute("class", "w-full h-full aspect-video object-cover select-none pointer-events-none ")
                    container.classList.add("w-full", "h-full");
                    container.classList.remove("w-[150px]", "h-[150px]");
                    container.innerHTML = "";
                    container.appendChild(videoTag)
                }
            } else {
                returnImgeContainer(participant?.name, participant?.userPic,container)
            }
        }
    }, [participant, meetingId, opponentNonMediaStreamStream, opponentStream, key, opponentScreenShareStream])


    function handelPinParticipant(participantId: string, type: string) {
        console.log(pinnedParticipants.length)
        console.log(!pinnedParticipants.includes(participantId))
        if (pinnedParticipants.length < 4 && !pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => [...prev, participantId])
            const temp: any = {}
            temp[participantId] = type;
            setpinnedType((prev: any) => {
                return { ...prev, ...temp }
            })
        }
    }
    function handelUnPinParticipant(participantId: string, type: string) {
        if (pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => prev.filter((id) => id !== participantId))
            setpinnedType((prev: any) => {
                const temp = prev;
                delete temp[participantId]
                return temp
            })
        }
    }

    function getContent(participant: any, size: number) {
        if (participant?.video) {
            return (
                <>
                    <video src={participant?.video} id={participant?.participantId} autoPlay loop className='w-full h-full select-none pointer-events-none '></video>
                </>
            );
        }
        else {
            return (
                <>
                    {
                        participant?.audio && <audio src={participant?.audio} autoPlay loop muted></audio>
                    }
                    <img
                        alt={participant?.name} src={participant?.userPic}
                        // min-w-[${size}px] max-w-[${size}px] min-h-[${size}px] max-h-[${size}px]
                        className={`w-full h-full object-cover rounded-full overflow-hidden select-none`}
                        // width={size} height={size}
                        draggable={false}
                    />
                </>
            );
        }
    }

    return (
        <>
            <div className='min-w-[300px] min-h-[250px] bg-purple-100 relative rounded-lg flex justify-center items-center' key={participant?.participantId}
                onMouseEnter={() => {
                    setShowPinSection(participant?.participantId)
                }}
                onMouseLeave={
                    () => {
                        setShowPinSection("")
                    }
                }
            >
                <ul className='w-full flex justify-between items-center absolute top-1 p-1 cursor-pointer'>
                    <ul>
                        <li className="py-1 min-w-[50px] px-2 bg-[#94A3B8] bg-opacity-80 rounded-full cursor-pointer text-white text-sm text-center truncate" >{participant?.userName}</li>
                    </ul>
                    <ul className={`${showPinSection == participant?.participantId || pinnedParticipants.includes(participant?.participantId) ? " flex " : " hidden "} `}>
                        {pinnedParticipants.length < 4 && !pinnedParticipants.includes(participant?.participantId) && <li className="p-2 bg-[#94A3B8] bg-opacity-80 ml-2 rounded-full cursor-pointer"
                            onClick={() => {
                                console.log("pinned participants")
                                handelPinParticipant(participant?.participantId, isScreenShare ? "screen-share" : "normal")
                            }}
                        >
                            <PinIco height={15} width={15} />
                        </li>}
                        {pinnedParticipants.includes(participant?.participantId) && <li className="p-2 bg-[#94A3B8] bg-opacity-80 ml-2 rounded-full cursor-pointer"
                            onClick={() => {
                                handelUnPinParticipant(participant?.participantId, isScreenShare ? "screen-share" : "normal")
                            }}
                        >
                            <UnPinIco height={15} width={15} />
                        </li>}
                        <li className="p-2 bg-[#94A3B8] bg-opacity-80 ml-2 rounded-full cursor-pointer">
                            <HorizontalThrreDot height={15} width={15} color='#F4F4F5' />
                        </li>
                    </ul>
                </ul>
                <ul className=' w-full h-full flex items-center justify-center' id={!isScreenShare ? `${participant?.participantId}-${meetingId}` : `${participant?.participantId}-screen-share-${meetingId}`}>
                    {/* {getContent(participant, 150)} */}
                </ul>
            </div>
        </>
    )
}

export default ParticipantCard
