import React from 'react'

const ChatIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5036 0C14.3918 0.00109095 16.2553 0.429694 17.9541 1.25364C19.653 2.0776 21.1431 3.2755 22.3127 4.75745C23.4822 6.23941 24.3009 7.96693 24.7071 9.81037C25.1134 11.6538 25.0968 13.5653 24.6585 15.4014C24.2202 17.2375 23.3716 18.9505 22.1764 20.4119C20.9813 21.8733 19.4705 23.0451 17.7576 23.8394C16.0447 24.6337 14.174 25.0298 12.2861 24.9981C10.3981 24.9663 8.5419 24.5075 6.85667 23.6561L6.66755 23.5545L0.970593 24.9764C0.860954 25.004 0.746638 25.0074 0.635535 24.9865C0.524431 24.9656 0.419186 24.9209 0.327061 24.8554C0.234936 24.7899 0.158125 24.7052 0.101929 24.6071C0.0457333 24.509 0.01149 24.3999 0.00156284 24.2874V24.1592L0.0234444 24.0295L1.44573 18.3358L1.34726 18.1483C0.632033 16.7408 0.191758 15.2098 0.0500146 13.6374L0.0109406 13.0405L0 12.4999C0 9.18474 1.31734 6.00533 3.66222 3.66114C6.00711 1.31695 9.18745 0 12.5036 0ZM12.5036 1.56249C10.5944 1.56218 8.71836 2.06134 7.06189 3.01036C5.40542 3.95938 4.02621 5.32522 3.0613 6.97216C2.09639 8.6191 1.57938 10.4898 1.56165 12.3984C1.54392 14.3069 2.02608 16.1869 2.96023 17.8515C3.03275 17.9809 3.06691 18.1283 3.0587 18.2765L3.03682 18.4233L1.85522 23.1436L6.58159 21.9655C6.67767 21.9418 6.77737 21.9365 6.87542 21.9499L7.01765 21.9827L7.15363 22.0436C8.6124 22.86 10.2389 23.3314 11.9083 23.4215C13.5777 23.5115 15.2455 23.218 16.7837 22.5633C18.3219 21.9086 19.6896 20.9102 20.7817 19.6448C21.8738 18.3793 22.6613 16.8805 23.0837 15.2634C23.5061 13.6463 23.5522 11.954 23.2184 10.3163C22.8846 8.67866 22.1799 7.13924 21.1583 5.81628C20.1367 4.49331 18.8254 3.422 17.3251 2.68461C15.8248 1.94721 14.1754 1.56335 12.5036 1.56249ZM13.2851 14.0624C13.4804 14.0621 13.6687 14.1348 13.813 14.2663C13.9573 14.3979 14.0472 14.5786 14.0648 14.7731C14.0825 14.9675 14.0266 15.1615 13.9084 15.3168C13.7901 15.4722 13.6179 15.5776 13.4258 15.6124L13.2851 15.6249H8.59623C8.40095 15.6253 8.21261 15.5525 8.0683 15.421C7.92398 15.2895 7.83416 15.1087 7.81652 14.9143C7.79887 14.7198 7.85468 14.5258 7.97296 14.3705C8.09124 14.2151 8.26341 14.1097 8.45557 14.0749L8.59623 14.0624H13.2851ZM16.411 9.37494C16.6063 9.37459 16.7946 9.44733 16.9389 9.57886C17.0832 9.71039 17.1731 9.89117 17.1907 10.0856C17.2084 10.28 17.1525 10.474 17.0343 10.6294C16.916 10.7847 16.7438 10.8902 16.5517 10.9249L16.411 10.9374H8.59623C8.40095 10.9378 8.21261 10.865 8.0683 10.7335C7.92398 10.602 7.83416 10.4212 7.81652 10.2268C7.79887 10.0324 7.85468 9.83836 7.97296 9.68302C8.09124 9.52767 8.26341 9.42223 8.45557 9.38744L8.59623 9.37494H16.411Z" fill={(props?.color) ? props?.color : "#202124"} />
        </svg>
    )
}

export default ChatIco