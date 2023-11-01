import React from 'react'

const OpenIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none">
            <path stroke={(props?.color) ? props?.color : "#202124"} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2 8-8m0 0v5m0-5h-5" />
        </svg>
    )
}

export default OpenIco
