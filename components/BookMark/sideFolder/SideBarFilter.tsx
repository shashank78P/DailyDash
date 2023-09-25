import React from 'react'

const SideBarFilter = ({ setShowFilters }: { setShowFilters: Function, showFilters: boolean }) => {
    return (
        <ul className='pl-2'>
            <li>Links </li>
            <li>Tags</li>
            <li>Without Tags</li>
        </ul>
    )
}

export default SideBarFilter