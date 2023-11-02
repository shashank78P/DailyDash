import React from 'react'
import { Stack, Pagination } from '@mui/material'

const PaginationBottonSection = ({ setPage , totalCount ,defaultPage}: { setPage: Function , totalCount : number , defaultPage : number }) => {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={totalCount}
          defaultPage={defaultPage}
          onChange={(e: any) => {
            console.log(e?.target?.innerText)
            setPage(Number(e?.target?.innerText) -1)
          }}
          sx={{
            '& .Mui-selected': {
              color: 'white',
              backgroundColor: "#7e22ce !important"
            },
          }}
        />
      </Stack>
    </div>
  )
}

export default PaginationBottonSection
