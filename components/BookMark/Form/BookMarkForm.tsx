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
import apiFromData from '@/components/lib/apiFormData'
import { Oval } from 'react-loader-spinner'

interface BookMarkFormDto {
    title: string,
    priority: string,
    link: string,
    hashTags: string[],
    description: string,
    bookMarkImageLink: string,
    imageId: string,
    pinned: boolean,
    isCustomAdd: boolean
}
const BookMarkForm = ({ defaultValue, refetch }: { defaultValue: BookMarkFormDto, refetch: Function }) => {
    const { selectedTab, createBookMark, setIsEdit, setCreateBookMark, isEdit, selectedId, setSelected } = useContext<BookMarkContextDto>(BookMarkContext)
    const { register, handleSubmit, formState: { errors, }, getValues, unregister, setValue } = useForm<BookMarkFormDto>({ defaultValues: defaultValue });
    const [hashTag, setHashTag] = useState<string[]>(defaultValue?.hashTags ?? [])
    const [fileRequiredError, setFileRequiredError] = useState<string | null>()
    const [file, setFile] = useState<Array<File>>([])
    const [bookMarkFormData, setBookMarkFormData] = useState<BookMarkFormDto>()
    const [preView, setPreView] = useState<Array<any>>([])
    const [isPinned, setIsPinned] = useState<boolean>(defaultValue?.pinned ?? false)
    const [isAllowedToGenerate, setIsAllowedToGenerate] = useState<boolean>(isEdit ? false : true)

    console.log(defaultValue)
    console.log(hashTag)
    const { mutate: postCreateBookmark, isLoading } = useMutation((data: any) => {
        return api.post("/book-marks/create-book-mark", data)
    },
        {
            onSuccess({ data }) {
                console.log(data?.[0]?._id)
                toast.success("BookMark added successfully")
                handelClose();
                refetch()
                setSelected({})
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const { mutate: updateBookmark, isLoading: isUpdateBookmarkLoading } = useMutation((data: any) => {
        return api.put(`/book-marks/update-book-mark?bookMarkId=${data?._id}`, data)
    },
        {
            onSuccess({ data }) {
                console.log(data?.[0]?._id)
                toast.success("BookMark updated successfully")
                handelClose();
                refetch()
                setSelected({})
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const { mutate: deleteFile, isLoading: isDeleteFileLoading } = useMutation((data: any) => {
        api.delete(`/file-system/delete?fileId=${data?.deletingFileId}`, data)
        return data;
    },
        {
            onSuccess(data: any) {
                toast.success("deleted previous file")
                updateBookmark(data);
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )
    const { mutate: uploadImage, isLoading: isUploadLoading } = useMutation(async (data: any) => {
        const fileData = await apiFromData.post("/file-system/upload", data?.file)
        return { ...data?.data, fileId: fileData?.data?.[0]?._id }
    },
        {
            onSuccess(data) {
                console.log(data)
                if (data?.isUpdate) {
                    if (data?.fileId) {
                        toast.success("file uploaded successfully")
                        deleteFile(data)
                    }
                    else {
                        toast.error("error in file uploaded")
                    }
                }
                else {
                    postCreateBookmark(data)
                }
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const { mutate: getWebsiteIconViaLink, isLoading: getWebsiteIconViaLinkIsLoading } = useMutation(async (data: any) => {
        const result = await api.post("/file-system/get-website-icon-from-link", { link: data?.link })
        return {fileId: result?.data?.[0]?._id , ...data}
    },
        {
            onSuccess(data) {
                console.log(data);
                toast.success("We got a image of provided link")
                postCreateBookmark(data)
            },
            onError(){
                toast.success("Failed to get image of provided link")
            }
        }
    )

    console.log({isPinned})

    const onSubmit = (data: any) => {
        console.log(data)
        data = { ...data, pinned: isPinned }
        console.log(isEdit)
        setBookMarkFormData(data)
        if (isEdit) {
            if (file?.length === 1) {
                const formData = new FormData()
                formData.append("file", file?.[0])
                uploadImage({ file: formData, data: { ...data, deletingFileId: data?.fileId, isBookMarkImageChanged: true, isUpdate: true } });
            }
            else {
                updateBookmark({ ...data, isBookMarkImageChanged: false })
            }
        }
        else {
            if (file?.length === 0 && !isAllowedToGenerate) {
                setFileRequiredError("File is required")
                return;
            }
            console.log(file)
            if (isAllowedToGenerate) {
                getWebsiteIconViaLink(data)
            }
            else if (file?.length === 1) {
                const formData = new FormData()
                formData.append("file", file?.[0])
                uploadImage({ file: formData, data })
            }
        }
    }

    const handelClose = () => {
        if (createBookMark) {
            setCreateBookMark(false)
        }
        else {
            setIsEdit(false)
        }
        setHashTag([])
        setFileRequiredError(null)
        setFile([])
        setSelected({})
    }

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

                            {/* title */}
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

                            {/* link */}
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

                            {/* pinned */}
                            <div
                                className='flex my-4 justify-between'
                            >
                                <label className='text-lg mb-1 '>Pin to quick access</label>
                                <div
                                    onClick={() => {
                                        setIsPinned(!isPinned)
                                    }}
                                    className={`w-[50px] h-[25px] mr-2 border ${isPinned ? " bg-purple-200 " : " bg-slate-200 "} rounded-[15px] shadow-lg cursor-pointer flex justify-start items-center`}
                                >
                                    <span
                                        className={`w-[20px] h-[20px] mx-1 border inline-block rounded-full shadow-lg transition-all ease-in-out ${isPinned ? "translate-x-full bg-purple-700" : " translate-x-0  bg-slate-700"}`}
                                    ></span>
                                </div>
                                {errors.pinned && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {errors.pinned.message}
                                    </p>
                                )}
                            </div>

                            {/* priority */}
                            <div
                                className='flex flex-col mb-3'
                            >
                                <label className='text-lg mb-1 '>Priority</label>
                                <select
                                    className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                    {...register(
                                        "priority",
                                        { required: "priority is required" })}
                                >
                                    <option value="HIGH" key="High">High</option>
                                    <option value="MEDIUM" key="Medium">Medium</option>
                                    <option value="LOW" key="Low">Low</option>
                                </select>
                                {errors.title && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* hashtags */}
                            <div
                                className='flex flex-col mb-4'
                            >
                                <label className='text-lg mb-1 '>Hash Tags</label>
                                <div className='text-sm placeholder:text-xs'>
                                    <TagsInput
                                        value={hashTag}
                                        {...register(
                                            "hashTags",
                                            {

                                            }
                                        )
                                        }
                                        onChange={(e: any) => {
                                            setHashTag(e)
                                            setValue("hashTags", e)
                                        }}
                                        placeHolder="Ex: #important"
                                    // className='p-2.5 border border-1 min-w-[350px]  border-gray-300 rounded-lg text-base'
                                    />
                                </div>
                                <p className="text-sm mt-2 text-slate-400">

                                </p>
                            </div>

                            {/* desctiption */}
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

                            {!isEdit && <div
                                className='flex my-4 justify-between'
                            >
                                <label className='text-lg mb-1 '>Get image by Url</label>
                                <div
                                    onClick={() => {
                                        setIsAllowedToGenerate(!isAllowedToGenerate)
                                    }}
                                    className={`w-[50px] h-[25px] mr-2 border ${isAllowedToGenerate ? " bg-purple-200 " : " bg-slate-200 "} rounded-[15px] shadow-lg cursor-pointer flex justify-start items-center`}
                                >
                                    <span
                                        className={`w-[20px] h-[20px] mx-1 border inline-block rounded-full shadow-lg transition-all ease-in-out ${isAllowedToGenerate ? "translate-x-full bg-purple-700" : " translate-x-0  bg-slate-700"}`}
                                    ></span>
                                </div>
                            </div>}

                            {(!isAllowedToGenerate || isEdit) && <div>
                                <DragAndDropFileInput maxFiles={1} multiple={false} maxSize={200000} minSize={10} setPreView={setPreView} isShowError={true} setFiles={setFile} accept={{ 'image': ['image/*'] }} />
                                {fileRequiredError && (
                                    <p className="text-sm mt-2 text-red-500">
                                        {fileRequiredError}
                                    </p>
                                )}
                            </div>}

                            <div className='my-2'>
                                {
                                    preView && Array.isArray(preView) && preView?.map((url, i) => {
                                        console.log(url)
                                        return (
                                            <>
                                                <div className='w-[150px] h-auto relative flex items-center m-2'>
                                                    <img src={url} alt="image" className=' min-w-[100px] w-auto max-h-[100px] rounded-lg' />
                                                    <div className='p-1 cursor-pointer'
                                                        onClick={() => {
                                                            const temp = preView?.filter((url, j) => {
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
                                {
                                    isEdit && <div className='w-[150px] h-auto relative flex items-center m-2'>
                                        <img src={defaultValue?.bookMarkImageLink} alt="image" className=' min-w-[100px] w-auto max-h-[100px] rounded-lg' />
                                        <div className='p-1 cursor-pointer'>
                                        </div>
                                    </div>
                                }
                            </div>
                            {!(isLoading || isDeleteFileLoading || isUpdateBookmarkLoading || isUploadLoading || getWebsiteIconViaLinkIsLoading ) && <input
                                className='w-full mt-5 full rounded-md p-2.5 bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 font-semibold cursor-pointer text-white'
                                type="submit"
                                value={` ${isEdit ? "Update" : "Create"} BookMark`}
                            />}
                            {
                                ((isLoading || isDeleteFileLoading || isUpdateBookmarkLoading || isUploadLoading || getWebsiteIconViaLinkIsLoading)) && <Oval height={20} width={20} color='#7e22ce' />
                            }
                        </div>
                        <div></div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BookMarkForm
