import React from 'react'

const AttachIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg fill={props?.color ? props?.color : "#202124"} width={props?.width} height={props?.height} viewBox="0 0 24 24" id="attachment" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color"><path id="primary" d="M12,22a7,7,0,0,1-7-7V7A5,5,0,0,1,15,7v8a3,3,0,0,1-6,0V7a1,1,0,0,1,2,0v8a1,1,0,0,0,2,0V7A3,3,0,0,0,7,7v8a5,5,0,0,0,10,0V10a1,1,0,0,1,2,0v5A7,7,0,0,1,12,22Z" ></path></svg>
    )
}

export default AttachIco