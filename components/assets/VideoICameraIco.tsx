import React from 'react'

const VideoICameraIco = (props: { width: number, height: number, color?: string, strokeWidth?: number }) => {
    return (
        // <svg fill={props?.color ? props?.color : "#202124"}
        //     // strokeWidth={0.5}
        //     width={props?.width} height={props?.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z" stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"} />
        // </svg>
        <svg width={props?.width} height={props?.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.217 6L17 9.377V7a2.002 2.002 0 0 0-2-2H3a2.002 2.002 0 0 0-2 2v10a2.002 2.002 0 0 0 2 2h12a2.002 2.002 0 0 0 2-2v-2.445L21.214 18H23V6zM16 17a1.001 1.001 0 0 1-1 1H3a1.001 1.001 0 0 1-1-1V7a1.001 1.001 0 0 1 1-1h12a1.001 1.001 0 0 1 1 1zm6 0h-.429L17 13.263v-2.605L21.568 7H22z" fill={props?.color ? props?.color : "#202124"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"} />
            <path fill="none" d="M0 0h24v24H0z"/>
        </svg>
    )
}

export default VideoICameraIco