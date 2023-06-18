import React from 'react'

const NoteIco = (props: { width: number, height: number, color: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5065 20.3995H1.56052V3.40984H12.5232L14.1009 2.08601L14.0603 2.05067H1.56052C0.698724 2.05067 0 2.65924 0 3.40984V20.3995C0 21.1501 0.698724 21.7587 1.56052 21.7587H19.5065C20.3683 21.7587 21.0671 21.1501 21.0671 20.3995V10.4466L19.5065 11.7439V20.3995ZM23.7707 0.885862C23.0665 0.29802 22.2894 0 21.4603 0C20.1628 0 19.2163 0.729875 18.9588 0.95348C18.5937 1.26745 8.25051 10.2628 8.25051 10.2628C8.16936 10.3348 8.11006 10.4228 8.07963 10.5207C7.79952 11.4222 6.39544 15.4263 6.38139 15.466C6.30883 15.6713 6.37359 15.8949 6.5472 16.0441C6.60766 16.0969 6.67954 16.1388 6.75868 16.1674C6.83783 16.196 6.92268 16.2107 7.00836 16.2105C7.07546 16.2105 7.14295 16.2021 7.20925 16.184C7.25685 16.1701 12.0004 14.834 12.7811 14.6312C12.8841 14.6047 12.9773 14.5561 13.0546 14.4905C13.5473 14.0671 23.0544 5.91516 23.8237 5.223C24.6192 4.50808 25.0148 3.76493 24.9996 3.01229C24.9852 2.26882 24.57 1.55322 23.7707 0.885862ZM22.7029 4.27697C22.2687 4.66706 18.8687 7.59336 12.5973 12.9743L12.1175 13.3865C11.3984 13.5802 9.67678 14.062 8.3753 14.4276C8.7943 13.2224 9.29718 11.7664 9.52151 11.0776C10.8616 9.91212 19.723 2.20596 20.0597 1.91645C20.1253 1.85935 20.7233 1.35883 21.4603 1.35883C21.8785 1.35883 22.2815 1.52499 22.6908 1.86682C23.18 2.27559 23.432 2.66839 23.4391 3.03537C23.4469 3.41322 23.1991 3.83083 22.7029 4.27697Z" fill={props?.color} />
        </svg>

    )
}

export default NoteIco