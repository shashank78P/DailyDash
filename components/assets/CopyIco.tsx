import React from 'react'

const CopyIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 4l1-1h5.414L14 6.586V14l-1 1H5l-1-1V4zm9 3l-3-3H5v10h8V7z" fill={props?.color ? props?.color : "#202124"} />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 1L2 2v10l1 1V2h6.414l-1-1H3z" fill={props?.color ? props?.color : "#202124"} />
        </svg>
    )
}

export default CopyIco