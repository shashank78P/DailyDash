import React from 'react'
import LinkIco from '@/components/assets/LinkIco'
import LeftAngularArrow from '@/components/assets/LeftAngularArrow'
import RightAngularArrow from '@/components/assets/RightAngularArrow'

const CallList = () => {
    return (
        <>
            <button className='w-full font-medium text-base flex '>
                <LinkIco width={20} height={20} />
                <span className='ml-2'>
                    Create meeting link
                </span>
            </button>
            <h2 className='my-2  font-semibold'>
                Call History
            </h2>
            <ul>
                <li><LeftAngularArrow width={20} height={20} /></li>
                <li><RightAngularArrow width={20} height={20} /></li>
            </ul>
        </>
    )
}

export default CallList
