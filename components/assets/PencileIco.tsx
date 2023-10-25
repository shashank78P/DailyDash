import React from 'react'

const PencileIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32" enable-background="new 0 0 32 32"  width={props?.width} height={props?.height}>
            <path fill="none" stroke={(props?.color) ? props?.color : "#202124"} stroke-width="1" stroke-miterlimit="10" d="M22.3,6.5l0.8-0.8c0.9-0.9,2.3-0.9,3.2,0l0,0
	c0.9,0.9,0.9,2.3,0,3.2l-0.8,0.8"/>
            <line fill="none" stroke={(props?.color) ? props?.color : "#202124"} stroke-width="1" stroke-miterlimit="10" x1="18.9" y1="8.8" x2="23.2" y2="13.1" />
            <polyline fill="none" stroke={(props?.color) ? props?.color : "#202124"} stroke-width="1" stroke-miterlimit="10" points="10.8,25.6 10,22 6.4,21.2 " />
            <path fill="none" stroke={(props?.color) ? props?.color : "#202124"} stroke-width="1" stroke-miterlimit="10" d="M10.5,25.9L5,27l1.1-5.5L21.7,5.9l4.4,4.4L10.5,25.9
	z"/>
        </svg>
    )
}

export default PencileIco
