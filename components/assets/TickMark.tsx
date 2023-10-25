import React from 'react'

const TickMark = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="Complete">
                <g id="tick">
                    <polyline points="3.7 14.3 9.6 19 20.3 5" fill="none" stroke={props?.color ? props?.color : "#202124"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                </g>
            </g>
        </svg>
    )
}

export default TickMark
