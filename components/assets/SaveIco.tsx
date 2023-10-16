import React from 'react'

const SaveIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <rect x="2" y="2" width="12" height="12" fill={props?.color ? props?.color : "#202124"} />
      </svg>
    )
}

export default SaveIco
