import React from 'react'

const VoiceMikeIco = (props: { width: number, height: number, color?: string ,strokeWidth? : number}) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_431_612)">
                <path d="M12.2979 1.02539C11.5022 1.02539 10.7391 1.34146 10.1765 1.90407C9.61392 2.46668 9.29785 3.22974 9.29785 4.02539V12.0254C9.29785 12.821 9.61392 13.5841 10.1765 14.1467C10.7391 14.7093 11.5022 15.0254 12.2979 15.0254C13.0935 15.0254 13.8566 14.7093 14.4192 14.1467C14.9818 13.5841 15.2979 12.821 15.2979 12.0254V4.02539C15.2979 3.22974 14.9818 2.46668 14.4192 1.90407C13.8566 1.34146 13.0935 1.02539 12.2979 1.02539Z" stroke={props?.color ? props?.color : "#202124"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"} stroke-linecap="round" stroke-linejoin="round" />
                <path  d="M19.2979 10.0254V12.0254C19.2979 13.8819 18.5604 15.6624 17.2476 16.9751C15.9348 18.2879 14.1544 19.0254 12.2979 19.0254C10.4413 19.0254 8.66086 18.2879 7.3481 16.9751C6.03535 15.6624 5.29785 13.8819 5.29785 12.0254V10.0254" stroke={props?.color ? props?.color : "#202124"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"} stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.2979 19.0254V23.0254" stroke={props?.color ? props?.color : "#202124"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"} stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.29785 23.0254H16.2979" stroke={props?.color ? props?.color : "#202124"} stroke-width={props?.strokeWidth ? props?.strokeWidth : "1"} stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_431_612">
                    <rect width="24" height="24" fill="white" transform="translate(0.297852 0.0253906)" />
                </clipPath>
            </defs>
        </svg> 
    )
}

export default VoiceMikeIco