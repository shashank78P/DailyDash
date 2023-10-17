import CopyIco from '@/components/assets/CopyIco'
import api from '@/components/lib/api'
import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { useQueries, useQuery } from 'react-query'

const InvitationLink = ({ setOptions, selectedChat }: any) => {
  const [selected, setSelected] = useState("h")
  const [enterNum, setEnteredNum] = useState(1)
  const [link, setLink] = useState("")
  const [Message, setMessage] = useState("")
  console.log({ enterNum, selected })

  async function copyTextToClipboard(text : string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const { data, isLoading, refetch } = useQuery(["generateInviteLink"], () => {
    return api.get(`/chats/generateInviteLink?belongsTo=${selectedChat?.belongsTo}&lifeSpan=${enterNum + selected}`)
  }, {
    onSuccess({ data }) {
      console.log(data)
      setLink(data?.link)
    },
  })
  return (
    <div>
      {/* <h1>Generate Invitation Link</h1> */}
      <ul>
        <li className='flex justify-start items-center my-2'>
          <div className=' mr-5'>Life Span</div>
          <div className=' flex justify-center items-center'>
            <input type="number" name="" id=""
              className='w-[100px] border bg-slate-50 text-slate-400 p-1 text-xs rounded-lg'
              value={enterNum}
              onChange={(e) => {
                setEnteredNum(Number(e?.target?.value))
              }}
            />
            <select className='ml-1.5'
              onChange={(e) => { setSelected(e?.target?.value) }}
            >
              <option selected={selected === "s"} value="s">sec</option>
              <option selected={selected === "m"} value="m">Min</option>
              <option selected={selected === "h"} value="h">Hrs</option>
              <option selected={selected === "d"} value="d">Day</option>
              <option selected={selected === "w"} value="w">Week</option>
              <option selected={selected === "M"} value="M">Month</option>
            </select>
          </div>
        </li>
        <li className=' '>
          <ul className='flex justify-between items-center border border-1 bg-slate-50 p-2 rounded-lg my-2'>
            <li className='truncate'>{link}</li>
            <li className='cursor-pointer'
              onClick={async()=>{
                console.log(await copyTextToClipboard(link))
                setMessage("Copied!!")
              }}
            >
              <CopyIco height={20} width={20} color='#94a3b8' />
            </li>
          </ul>
        </li>
        <li className='text-green-500 text-sm'>
          {Message}
        </li>
        <li className='flex justify-end items-center my-2'>
          <button className='mx-2 text-red-500 text-base'
            onClick={() => {
              setOptions("")
            }}
          >Cancel</button>
          {
            isLoading ? 
            <Oval color='#7e22ce' secondaryColor='#7e22ce' height={20} width={20}/>
            :
            <button
              className='mx-2 p-2 px-4 rounded-lg text-white border border-blue-700 bg-blue-700 text-base'
              onClick={() => {
                setMessage("")
                refetch()
              }}
            >Generate</button>
          }
        </li>
      </ul>
    </div>
  )
}

export default InvitationLink
