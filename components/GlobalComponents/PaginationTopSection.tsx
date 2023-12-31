import React from 'react'

type PaginationTopSectionDto = {
    isStatus: boolean,
    setRows: Function,
    setSearch: Function,
    search: string
    rows: string
    setStatus?: Function,
    status?: string,
    statusList?: string[]
    statuslabel?: string
}

const PaginationTopSection = ({ setStatus, search, setRows, setSearch, rows, status, isStatus , statusList , statuslabel}: PaginationTopSectionDto) => {
    return (
        <div className='flex justify-between items-center flex-wrap px-2'>
            <div className=' my-2 max-w-[500px] min-w-[200px] w-[300px]'>
                <input
                    type='text'
                    placeholder='search...'
                    className='w-full border p-2 text-base rounded-lg text-slate-700'
                    value={search}
                    onChange={(e) => {
                        setSearch(e?.target?.value)
                    }}
                />
            </div>
            <div className='w-full sm:w-auto my-2 flex flex-wrap justify-between sm:justify-end items-center'>
                <div className='mr-2'>
                    <span>Rows: </span>
                    <input
                        value={rows}
                        onChange={(e: any) => {
                            if (e?.target?.value > 0) {
                                setRows(e?.target?.value)
                            } else if (e?.target?.value > 0 === null || e?.target?.value > 0 === undefined || e?.target?.value === "") {
                                setRows(10)
                            }
                        }}
                        type="text"
                        className='border p-2 text-base text-center rounded-lg text-slate-700 min-w-[50px] max-w-[80px]'
                    />
                </div>
                {isStatus && <div className='mr-2'>
                    <span>{statuslabel}: </span>
                    <select
                        className='border p-2.5 text-base rounded-lg text-slate-700'
                        onChange={(e: any) => {
                            if (setStatus) {
                                setStatus(e?.target?.value)
                            }
                        }}
                    >
                        {
                            statusList?.map((ele, i )=>{
                                return(
                                    <option selected={status === ele} key={ele} value={ele} >{ele}</option>
                                )
                            })
                        }
                    </select>
                </div>}
            </div>

        </div>
    )
}

export default PaginationTopSection
