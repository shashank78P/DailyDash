// @ts-nocheck
import React from 'react'

const VideoSlashIco = (props: { width: number, height: number, color?: string, strokeWidth?: number }) => {
    return (
        <svg strokeWidth={props?.strokeWidth ? props?.strokeWidth : "1"} width={props?.width} height={props?.height} viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.217 6L17 9.377V7a2.002 2.002 0 0 0-2-2H3a2.002 2.002 0 0 0-2 2v10a2.002 2.002 0 0 0 2 2h12a2.002 2.002 0 0 0 2-2v-2.445L21.214 18H23V6zM16 17a1.001 1.001 0 0 1-1 1H3a1.001 1.001 0 0 1-1-1V7a1.001 1.001 0 0 1 1-1h12a1.001 1.001 0 0 1 1 1zm6 0h-.429L17 13.263v-2.605L21.568 7H22z" fill={props?.color ? props?.color : "#202124"}
                stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"}
            />
            <line x1="0" y1="0" x2="24" y2="24"
                stroke={props?.color ? props?.color : "#202124"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"}
            />
        </svg>
    )
}

export default VideoSlashIco
