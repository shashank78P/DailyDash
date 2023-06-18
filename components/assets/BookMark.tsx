import React from 'react'

const BookMark = (props: { width: number, height: number, color: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1875 1.34375H3.8125C3.1909 1.34375 2.59476 1.59068 2.15522 2.03022C1.71568 2.46976 1.46875 3.0659 1.46875 3.6875V21.6562L8.5 15.4062L15.5312 21.6562V3.6875C15.5312 3.0659 15.2843 2.46976 14.8448 2.03022C14.4052 1.59068 13.8091 1.34375 13.1875 1.34375Z" stroke={props?.color} stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default BookMark