"use client"
import Room from '@/components/Meet/Meet/Room/Room'
import { SocketContext } from '@/components/context/SocketContext';
import { meetingAction } from '@/components/store/slice/meetingSlice';
import { useSearchParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const [meetingId, setMeetingId] = useState<String | null>(null)
  const [myStream, setmyStream] = useState<MediaStream | null>(null)
  const [opponentStream, setOpponentStream] = useState<MediaStream | null>(null)
  const { socket, myPeer }: any = useContext(SocketContext);
  const userSelector = useSelector((state: any) => state?.userSliceReducer);
  const meetingSelector = useSelector((state: any) => state?.meetingSliceReducer);
  const param = useSearchParams();
  let dispatch = useDispatch();
  const ref = useRef<HTMLVideoElement>(null)
  const oppo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMeetingId(param?.get("id"))
  }, [])
  useEffect(() => {
    if (oppo.current) {
      console.log("setting stream to video tag")
      oppo.current.srcObject = opponentStream
    }
  }, [opponentStream])

  useEffect(() => {
    if (ref.current && myStream) {
      console.log("setting stream to video tag")
      ref.current.srcObject = myStream
    }
  }, [myStream, ref])

  console.log(meetingSelector)

  const handelCall = (joinedUserId: string) => {
    console.log("handel  call")
    // if (meetingSelector?.myStream && myPeer) {
    console.log("calling " + joinedUserId);
    if (meetingSelector?.audio && meetingSelector?.video) {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, function (stream: MediaStream) {
        setmyStream(stream)
        const call = myPeer.call(joinedUserId, stream);
        call.on("stream", function (remoteStream: MediaStream) {
          setOpponentStream(remoteStream)
          console.log("recieved stream from ")
          console.log(remoteStream)
        })
      })
    }
    // }
  }

  const handelJoin = (joinedUserId: string) => {
    console.log("handel  join")
    console.log(meetingSelector)
    if (meetingSelector?.video || meetingSelector?.audio) {
      handelCall(joinedUserId)
    }
  }

  const notificationHandler = (data: any) => {
    console.log("handel notify", data)
    console.log(data?.type === "joined")
    if (data?.type === "joined" && data?.userId !== userSelector?.userId) {
      handelJoin(data?.userId)
    }
  }

  const startMedia = () => {
    dispatch(meetingAction.setAudio(true))
    dispatch(meetingAction.setVideo(true))
  }

  useEffect(() => {
    if (socket && myPeer) {
      myPeer.on("call", function (call: any) {
        console.log("recieved call")
        console.log(meetingSelector?.audio, meetingSelector?.video)
        call.on('stream', function (remoteStream: MediaStream) {
          console.log("opponent stream");
          setOpponentStream(remoteStream)
        });
        if ((meetingSelector?.audio || meetingSelector?.video)) {
          console.log("answering call mystream")
          call.answer(myStream)
        }else{
          console.log("answering call new MediaStream")
          call.answer(new MediaStream())
        }
        // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        // getUserMedia({ video: true, audio: true, screen: true }, async function (stream: MediaStream) {
        // })
        console.log("=======")
      })
    }
  }, [socket, myPeer, userSelector?.userId, meetingSelector?.audio, meetingSelector?.video])


  useEffect(() => {
    if (socket && myPeer?._id && userSelector.userId && meetingId) {
      // socket.emit("joined-meeting", { userId: userSelector.userId, meetingId })
    }
  }, [socket, myPeer?._id, userSelector.userId, meetingId])

  useEffect(() => {
    if (socket && myPeer?._id && userSelector.userId && meetingId) {
      socket.on(`${meetingId}-notify`, notificationHandler)
    }
  }, [socket, myPeer?._id, userSelector.userId, meetingId, meetingSelector.audio, meetingSelector?.video])

  return (
    <>
      <div>
        <video width={200} height={150} ref={ref} autoPlay controls />
        <video width={200} height={150} ref={oppo} autoPlay controls />
        <button
          onClick={() => {
            startMedia()
          }}
        >Start media</button>
        <button
          onClick={() => {
            handelCall( userSelector?.userId == "6522964ed4e29dd9fb7c8547" ? "651f9f640fda2143f57d4a54" : "6522964ed4e29dd9fb7c8547")
          }}
        >call</button>
      </div>
    </>
  )
}

export default page
