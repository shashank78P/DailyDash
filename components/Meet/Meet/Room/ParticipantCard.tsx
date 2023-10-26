
import HorizontalThrreDot from '@/components/assets/HorizontalThrreDot';
import PinIco from '@/components/assets/PinIco';
import UnPinIco from '@/components/assets/UnPinIco';
import React, { useContext, useEffect } from 'react'
import { streamContextDto } from '../../types';
import MediaContext from '../State/MediaContext';

const ParticipantCard = ({ participant, key }: { participant: any, key: number }) => {
    // @ts-ignore
    const { meetingId, opponentNonMediaStreamStream, opponentStream, setShowPinSection, showPinSection, pinnedParticipants, setPinnedParticipants } = useContext<streamContextDto>(MediaContext)

    function returnImgeContainer(container: any) {
        let imgTag = document.createElement("img")
        imgTag.setAttribute("alt", participant?.name)
        imgTag.setAttribute("src", participant?.userPic)
        imgTag.setAttribute("draggable", "false")
        imgTag.setAttribute("class", "w-full h-full object-cover rounded-full overflow-hidden select-none")
        container.classList.remove("w-full", "h-full");
        container.classList.add("w-[150px]", "h-[150px]");
        container.innerHTML = "";
        container.appendChild(imgTag)
    }

    useEffect(() => {
        if (participant?.participantId && meetingId && opponentStream && opponentNonMediaStreamStream) {
            let container: any = document.getElementById(participant.participantId + meetingId)
            console.log({opponentNonMediaStreamStream , opponentStream})
            if (
                Array.isArray(opponentNonMediaStreamStream) &&
                !opponentNonMediaStreamStream?.includes(participant?.participantId) &&
                Object.keys(opponentStream).includes(participant?.participantId)
            ) {
                let stream: MediaStream = opponentStream[participant?.participantId]
                let track = stream.getTracks()
                if (track?.length == 1 && track?.[0]?.kind == "audio") {
                    returnImgeContainer(container)
                    let audioTag = document.createElement("audio")
                    audioTag.srcObject = opponentStream[participant?.participantId]
                    audioTag.setAttribute("autoPlay", "true")
                    audioTag.setAttribute("class", "disable")
                    container.appendChild(audioTag)
                } else {
                    let videoTag = document.createElement("video")
                    videoTag.srcObject = opponentStream[participant?.participantId]
                    videoTag.setAttribute("autoPlay", "true")
                    videoTag.setAttribute("class", "w-full h-full aspect-video object-cover select-none pointer-events-none ")
                    container.classList.add("w-full", "h-full");
                    container.classList.remove("w-[150px]", "h-[150px]");
                    container.innerHTML = "";
                    container.appendChild(videoTag)
                }
            } else {
                returnImgeContainer(container)
            }
        }
    }, [participant, meetingId, opponentNonMediaStreamStream, opponentStream])


    function handelPinParticipant(participantId: string) {
        console.log(pinnedParticipants.length)
        console.log(!pinnedParticipants.includes(participantId))
        if (pinnedParticipants.length < 4 && !pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => [...prev, participantId])
        }
    }
    function handelUnPinParticipant(participantId: string) {
        if (pinnedParticipants.includes(participantId)) {
            setPinnedParticipants((prev: Array<String>) => prev.filter((id) => id !== participantId))
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
            <div className='min-w-[300px] min-h-[250px] bg-purple-100 relative rounded-lg flex justify-center items-center' key={key}
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
                                handelPinParticipant(participant?.participantId)
                            }}
                        >
                            <PinIco height={15} width={15} />
                        </li>}
                        {pinnedParticipants.includes(participant?.participantId) && <li className="p-2 bg-[#94A3B8] bg-opacity-80 ml-2 rounded-full cursor-pointer"
                            onClick={() => {
                                handelUnPinParticipant(participant?.participantId)
                            }}
                        >
                            <UnPinIco height={15} width={15} />
                        </li>}
                        <li className="p-2 bg-[#94A3B8] bg-opacity-80 ml-2 rounded-full cursor-pointer">
                            <HorizontalThrreDot height={15} width={15} color='#F4F4F5' />
                        </li>
                    </ul>
                </ul>
                <ul className=' w-full h-full flex items-center justify-center' id={participant?.participantId + meetingId}>
                    {/* {getContent(participant, 150)} */}
                </ul>
            </div>
        </>
    )
}

export default ParticipantCard
