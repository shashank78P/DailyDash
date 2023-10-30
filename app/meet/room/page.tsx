"use client"
import Room from '@/components/Meet/Meet/Room/Room';
import MedaiState from '@/components/Meet/Meet/State/MediaState';

const Page = () => {
  return (
    <>
      <div className='w-[100hv - 50px] h-[100vw] overflow-hidden flex flex-col'>
        <MedaiState>
          <Room />
        </MedaiState>
      </div>
    </>
  )
}

export default Page
