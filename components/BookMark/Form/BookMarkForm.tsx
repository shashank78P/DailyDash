import CrossIco from '@/components/assets/CrossIco'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { TagsInput } from 'react-tag-input-component'
import BookMarkContext from '../state/BookMarkContext'
import { BookMarkContextDto } from '../types'
import { toast } from 'react-toastify'
import api from '@/components/lib/api'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import DragAndDropFileInput from '@/components/GlobalComponents/DragAndDropFileInput'
import DeleteIco from '@/components/assets/DeleteIco'

interface BookMarkFormDto {
    title: string,
    link: string,
    hashTag: string[],
    description: string
}
const BookMarkForm = () => {
    const { selectedTab, createBookMark, setIsEdit, setCreateBookMark, isEdit, selectedId } = useContext<BookMarkContextDto>(BookMarkContext)
    const { register, handleSubmit, formState: { errors, }, getValues, unregister, setValue } = useForm<BookMarkFormDto>({ defaultValues: {} });
    const [hashTag, setHashTag] = useState([])
    const [fileRequiredError, setFileRequiredError] = useState<string>()
    const [file, setFile] = useState<Array<File>>([])
    const [preView, setPreView] = useState<Array<any>>([])

    const { mutate: postCreateBookmark, isLoading } = useMutation((data: any) => {
        return api.post("/bookmark/create-bookmark", data)
    },
        {
            onSuccess({ data }) {
                console.log(data?.[0]?._id)
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const onSubmit = (data: any) => {
        console.log(data)
        if(file?.length === 0){
            setFileRequiredError("File is required")
            return;
        }
        if(isEdit){

        }else{
            postCreateBookmark(data)
        }
    }

    const handelClose = () => {
        if (createBookMark) {
            setCreateBookMark(false)
        }
        else {
            setIsEdit(false)
        }
    }

    console.log(preView)
    return (
        <>
            <Dialog
                open={(createBookMark || (isEdit && selectedId != null))}
                style={{
                    padding: "2px",
                    minWidth: "300px",
                }}
            >
                <DialogTitle>
                    <ul className='w-full flex justify-between items-center'>
                        <li className='font-semibold '>{isEdit ? "Edit" : "Create"} BookMark</li>
                        <li
                            className='cursor-pointer'
                            onClick={() => {
                                handelClose()
                            }}>
                            <CrossIco height={30} width={30} color='red' />
                        </li>
                    </ul>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='mb-5 sm:text-xl'>
                        <div className=''>
                            <div
                                className='flex flex-col mb-3'
                            >
                                <label className='text-lg mb-1 '>Title</label>
                                <input
                                    type='text'
                                    className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                    {...register(
                                        "title",
                                        { required: "title is required" })}
                                />
                                {errors.title && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div
                                className='flex flex-col mb-4'
                            >
                                <label className='text-lg mb-1 '>Hash Tags</label>
                                <div className='text-sm placeholder:text-xs'>
                                    <TagsInput
                                        value={hashTag}
                                        {...register(
                                            "hashTag",
                                            {}
                                        )
                                        }
                                        onChange={(e: any) => {
                                            setHashTag(e)
                                            // setValue("participantsEmail", e)
                                        }}
                                        placeHolder="Ex: #important"
                                    // className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                    />
                                </div>
                                <p className="text-sm mt-2 text-slate-400">

                                </p>
                            </div>
                            <div
                                className='flex flex-col mb-4'
                            >
                                <label className='text-lg mb-1 '>link</label>
                                <input
                                    type='link'
                                    className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                    {...register(
                                        "link",
                                        { required: "link is required" })}
                                />
                                {errors.link && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {errors.link.message}
                                    </p>
                                )}
                            </div>
                            <div
                                className='flex flex-col mb-4'
                            >
                                <label className='text-lg mb-1 '>Description:</label>
                                <textarea
                                    className='min-h-[100px] p-2.5 border border-1  border-gray-300 rounded-lg text-base'
                                    {...register(
                                        "description",
                                        {})}
                                />
                            </div>
                            <div>
                                <DragAndDropFileInput maxFiles={1} multiple={false} maxSize={200000} minSize={10} setPreView={setPreView} isShowError={true}  setFiles = { setFile }/>
                                {fileRequiredError && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {fileRequiredError}
                                    </p>
                                )}
                            </div>

                            <div className='my-2'>
                                {
                                    preView && Array.isArray(preView) && preView?.map((url, i) => {
                                        console.log(url)
                                        return (
                                            <>
                                                <div className='w-[150px] h-auto relative flex items-center m-2'>
                                                    <img src={url} alt="image" className=' min-w-[100px] w-auto max-h-[100px] rounded-lg' />
                                                    <div className='p-1 cursor-pointer'
                                                        onClick={()=>{
                                                            const temp = preView?.filter((url , j) => {
                                                                return i !== j;
                                                            })
                                                            setPreView(temp)
                                                        }}
                                                    >
                                                        <DeleteIco height={20} width={20} color='red' />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <input
                                className='w-full mt-5 full rounded-md p-2.5 bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 font-semibold cursor-pointer text-white'
                                type="submit"
                                value={` ${isEdit ? "Create" : "Update"} BookMark`}
                            />
                        </div>
                        <div></div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BookMarkForm
