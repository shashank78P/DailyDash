import React from 'react'

const CallEndIco = (props: { width: number, height: number, color?: string, strokeWidth?: number }) => {
    return (
        <>
            <svg width={props?.width} height={props?.height} viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.13333 15.1208L12.6667 9.9375V4.32083C17.4167 2.77083 22.5667 2.77083 27.3333 4.32083V9.95417L33.85 15.1208L40 8.9875C29.3167 -2.99583 10.6833 -2.99583 0 8.9875L6.13333 15.1208Z" fill={props?.color ? props?.color : "#F4F4F5"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"}/>
            </svg>
        </>
    )
}

export default CallEndIco
