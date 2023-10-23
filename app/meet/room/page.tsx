"use client"
import JoinMeetingRequest from '@/components/Meet/Meet/Room/JoinMeetingRequest';
import Room from '@/components/Meet/Meet/Room/Room'
import MedaiState, { streamContext } from '@/components/Meet/Meet/State/MediaState';

const page = () => {
  
  console.log("room")
  return (
    <>
      <div className='w-full h-full'>
        <MedaiState>
          <Room />
        </MedaiState>
      </div>
    </>
  )
}

export default page
