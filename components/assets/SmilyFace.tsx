import React from 'react'

const SmilyFace = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9H10V11H8V9Z" fill={props?.color ? props?.color : "#202124"} />
            <path d="M14 9H16V11H14V9Z" fill={props?.color ? props?.color : "#202124"} />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 13C9.5 14.3807 10.6193 15.5 12 15.5C13.3807 15.5 14.5 14.3807 14.5 13H16C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13H9.5Z" fill={props?.color ? props?.color : "#202124"} />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill={props?.color ? props?.color : "#202124"} />
        </svg>
    )
}

export default SmilyFace
