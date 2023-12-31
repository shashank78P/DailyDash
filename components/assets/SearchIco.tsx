import React from 'react'

const SearchIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5362 20.5299C5.37748 20.5299 0.41626 15.9502 0.41626 10.265C0.41626 4.57975 5.37748 0 11.5362 0C17.695 0 22.6562 4.57975 22.6562 10.265C22.6562 15.9502 17.695 20.5299 11.5362 20.5299ZM11.5362 1.57923C6.3184 1.57923 2.12702 5.44833 2.12702 10.265C2.12702 15.0816 6.3184 18.9507 11.5362 18.9507C16.7541 18.9507 20.9454 15.0816 20.9454 10.265C20.9454 5.44833 16.7541 1.57923 11.5362 1.57923Z" fill={props?.color ? props?.color : "#202124"} />
            <path d="M19.8182 16.793L27.4995 23.8837L26.29 25.0002L18.6086 17.9095L19.8182 16.793Z" fill={props?.color ? props?.color : "#202124"} />
        </svg>
    )
}

export default SearchIco