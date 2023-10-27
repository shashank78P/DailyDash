import React from 'react'

const PauseIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg fill={props?.color ? props?.color : "#202124"} xmlns="http://www.w3.org/2000/svg"
            width={props?.width} height={props?.height} viewBox="0 0 52 52" enable-background="new 0 0 52 52" >
            <path d="M30,43c0,1,0.9,2,2,2h4c1.1,0,2-1.1,2-2V9c0-1-0.9-2-2-2h-4c-1.1,0-2,1.1-2,2V43z" />
            <path d="M14,43c0,1,0.9,2,2,2h4c1.1,0,2-1.1,2-2V9c0-1-0.9-2-2-2h-4c-1.1,0-2,1.1-2,2V43z" />
        </svg>
    )
}

export default PauseIco
