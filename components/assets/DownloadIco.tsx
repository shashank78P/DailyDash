import React from 'react'

const DownloadIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32" enable-background="new 0 0 32 32" >
            <line fill="none" stroke={props?.color ? props?.color : "#202124"} stroke-width="2" stroke-miterlimit="10" x1="25" y1="28" x2="7" y2="28" />
            <line fill="none" stroke={props?.color ? props?.color : "#202124"} stroke-width="2" stroke-miterlimit="10" x1="16" y1="23" x2="16" y2="4" />
            <polyline fill="none" stroke={props?.color ? props?.color : "#202124"} stroke-width="2" stroke-miterlimit="10" points="9,16 16,23 23,16 " />
        </svg>
    )
}

export default DownloadIco