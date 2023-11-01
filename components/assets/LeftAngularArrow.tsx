import React from 'react'

const LeftAngularArrow = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg
            fill={(props?.color) ? props?.color: "#202124"}
            width={props?.width}
            height={props?.height}
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path 
                d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"/>
        </svg>
    )
}

export default LeftAngularArrow
