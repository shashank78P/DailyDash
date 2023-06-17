import React from 'react'

const DynamicForm = (props: { width: number, height: number }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6875 0C3.4443 0 2.25201 0.49386 1.37294 1.37294C0.49386 2.25201 0 3.4443 0 4.6875V17.1875C0 18.4307 0.49386 19.623 1.37294 20.5021C2.25201 21.3811 3.4443 21.875 4.6875 21.875H10.3125C10.057 21.3756 9.8513 20.8522 9.69844 20.3125H4.6875C3.8587 20.3125 3.06384 19.9833 2.47779 19.3972C1.89174 18.8112 1.5625 18.0163 1.5625 17.1875V4.6875C1.5625 3.8587 1.89174 3.06384 2.47779 2.47779C3.06384 1.89174 3.8587 1.5625 4.6875 1.5625H17.1875C18.0163 1.5625 18.8112 1.89174 19.3972 2.47779C19.9833 3.06384 20.3125 3.8587 20.3125 4.6875V9.69844C20.8578 9.85312 21.3797 10.0578 21.875 10.3125V4.6875C21.875 3.4443 21.3811 2.25201 20.5021 1.37294C19.623 0.49386 18.4307 0 17.1875 0H4.6875ZM10.1562 10.9375H13.0266C14.425 9.95312 16.1297 9.375 17.9688 9.375H10.1562C9.94905 9.375 9.75034 9.45731 9.60382 9.60382C9.45731 9.75034 9.375 9.94905 9.375 10.1562C9.375 10.3635 9.45731 10.5622 9.60382 10.7087C9.75034 10.8552 9.94905 10.9375 10.1562 10.9375ZM3.90625 3.125C3.69905 3.125 3.50034 3.20731 3.35382 3.35382C3.20731 3.50034 3.125 3.69905 3.125 3.90625C3.125 4.11345 3.20731 4.31216 3.35382 4.45868C3.50034 4.60519 3.69905 4.6875 3.90625 4.6875H17.9688C18.176 4.6875 18.3747 4.60519 18.5212 4.45868C18.6677 4.31216 18.75 4.11345 18.75 3.90625C18.75 3.69905 18.6677 3.50034 18.5212 3.35382C18.3747 3.20731 18.176 3.125 17.9688 3.125H3.90625ZM5.46875 12.5C6.09035 12.5 6.68649 12.2531 7.12603 11.8135C7.56557 11.374 7.8125 10.7779 7.8125 10.1562C7.8125 9.53465 7.56557 8.93851 7.12603 8.49897C6.68649 8.05943 6.09035 7.8125 5.46875 7.8125C4.84715 7.8125 4.25101 8.05943 3.81147 8.49897C3.37193 8.93851 3.125 9.53465 3.125 10.1562C3.125 10.7779 3.37193 11.374 3.81147 11.8135C4.25101 12.2531 4.84715 12.5 5.46875 12.5ZM5.46875 10.9375C5.26155 10.9375 5.06284 10.8552 4.91632 10.7087C4.76981 10.5622 4.6875 10.3635 4.6875 10.1562C4.6875 9.94905 4.76981 9.75034 4.91632 9.60382C5.06284 9.45731 5.26155 9.375 5.46875 9.375C5.67595 9.375 5.87466 9.45731 6.02118 9.60382C6.16769 9.75034 6.25 9.94905 6.25 10.1562C6.25 10.3635 6.16769 10.5622 6.02118 10.7087C5.87466 10.8552 5.67595 10.9375 5.46875 10.9375ZM5.46875 18.75C6.09035 18.75 6.68649 18.5031 7.12603 18.0635C7.56557 17.624 7.8125 17.0279 7.8125 16.4062C7.8125 15.7846 7.56557 15.1885 7.12603 14.749C6.68649 14.3094 6.09035 14.0625 5.46875 14.0625C4.84715 14.0625 4.25101 14.3094 3.81147 14.749C3.37193 15.1885 3.125 15.7846 3.125 16.4062C3.125 17.0279 3.37193 17.624 3.81147 18.0635C4.25101 18.5031 4.84715 18.75 5.46875 18.75ZM5.46875 15.625C5.67595 15.625 5.87466 15.7073 6.02118 15.8538C6.16769 16.0003 6.25 16.199 6.25 16.4062C6.25 16.6135 6.16769 16.8122 6.02118 16.9587C5.87466 17.1052 5.67595 17.1875 5.46875 17.1875C5.26155 17.1875 5.06284 17.1052 4.91632 16.9587C4.76981 16.8122 4.6875 16.6135 4.6875 16.4062C4.6875 16.199 4.76981 16.0003 4.91632 15.8538C5.06284 15.7073 5.26155 15.625 5.46875 15.625ZM25 17.9688C25 19.8336 24.2592 21.622 22.9406 22.9406C21.622 24.2592 19.8336 25 17.9688 25C16.1039 25 14.3155 24.2592 12.9969 22.9406C11.6783 21.622 10.9375 19.8336 10.9375 17.9688C10.9375 16.1039 11.6783 14.3155 12.9969 12.9969C14.3155 11.6783 16.1039 10.9375 17.9688 10.9375C19.8336 10.9375 21.622 11.6783 22.9406 12.9969C24.2592 14.3155 25 16.1039 25 17.9688ZM18.75 14.8438C18.75 14.6365 18.6677 14.4378 18.5212 14.2913C18.3747 14.1448 18.176 14.0625 17.9688 14.0625C17.7615 14.0625 17.5628 14.1448 17.4163 14.2913C17.2698 14.4378 17.1875 14.6365 17.1875 14.8438V17.1875H14.8438C14.6365 17.1875 14.4378 17.2698 14.2913 17.4163C14.1448 17.5628 14.0625 17.7615 14.0625 17.9688C14.0625 18.176 14.1448 18.3747 14.2913 18.5212C14.4378 18.6677 14.6365 18.75 14.8438 18.75H17.1875V21.0938C17.1875 21.301 17.2698 21.4997 17.4163 21.6462C17.5628 21.7927 17.7615 21.875 17.9688 21.875C18.176 21.875 18.3747 21.7927 18.5212 21.6462C18.6677 21.4997 18.75 21.301 18.75 21.0938V18.75H21.0938C21.301 18.75 21.4997 18.6677 21.6462 18.5212C21.7927 18.3747 21.875 18.176 21.875 17.9688C21.875 17.7615 21.7927 17.5628 21.6462 17.4163C21.4997 17.2698 21.301 17.1875 21.0938 17.1875H18.75V14.8438Z" fill="#202124" />
        </svg>

    )
}

export default DynamicForm