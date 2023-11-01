import React from 'react'

const CardViewIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.25 2H3.75C2.7835 2 2 2.7835 2 3.75V21.25C2 22.2165 2.7835 23 3.75 23H21.25C22.2165 23 23 22.2165 23 21.25V3.75C23 2.7835 22.2165 2 21.25 2Z" stroke={(props?.color) ? props?.color: "#202124"} stroke-width="1.5" stroke-linejoin="round" />
            <path d="M6.08325 6.0835H10.7499V10.7502H6.08325V6.0835ZM14.2499 6.0835H18.9166V10.7502H14.2499V6.0835ZM6.08325 14.2502H10.7499V18.9168H6.08325V14.2502ZM14.2499 14.2502H18.9166V18.9168H14.2499V14.2502Z" stroke={(props?.color) ? props?.color: "#202124"} stroke-width="1.5" stroke-linejoin="round" />
        </svg>
    )
}

export default CardViewIco
