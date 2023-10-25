import React from 'react'

const HorizontalThrreDot = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg fill={props?.color ? props?.color : "#202124"} xmlns="http://www.w3.org/2000/svg"
            width={props?.width} height={props?.height} viewBox="0 0 52 52"
        // enable-background="new 0 0 52 52"
        >
            <path d="M20,44c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,47.3,20,44z M20,26c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6
	S20,29.3,20,26z M20,8c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,11.3,20,8z"/>
        </svg>
    )
}

export default HorizontalThrreDot