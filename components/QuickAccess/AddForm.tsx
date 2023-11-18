"use client"
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { Oval } from 'react-loader-spinner';
import { TagsInput } from 'react-tag-input-component';
import DragAndDropFileInput from '../GlobalComponents/DragAndDropFileInput';
import DeleteIco from '../assets/DeleteIco';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import api from '../lib/api';
import CrossIco from '../assets/CrossIco';

export interface addToQuickAccessDto {
    title: string,
    link: string,
    _id?: string,
    fileId?: string,
}

type props = {
    isOpen: boolean,
    isEdit: boolean,
    setIsEdit: Function,
    setIsOpen: Function,
    defaultValue: addToQuickAccessDto,
    setDefaultValue: Function
}

const AddForm = ({ isOpen, isEdit, setIsEdit, setIsOpen, defaultValue, setDefaultValue }: props) => {
    console.log(defaultValue)
    const { register, handleSubmit, formState: { errors }, getValues, unregister, setValue, reset } = useForm<addToQuickAccessDto>({ defaultValues: defaultValue });

    function handelClose() {
        setIsEdit(false)
        setIsOpen(false)
        setDefaultValue({})
        reset()
    }

    const { mutate: deleteFile, isLoading: isDeleteFileLoading } = useMutation((data: any) => {
        api.delete(`/file-system/delete?fileId=${data?.fileId}`, data)
        return data;
    },
        {
            onSuccess(data: any) {
                toast.success("deleted previous file")
                getFileId({...data?.data});
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const { mutate: getFileId, isLoading: getFileIdIsLoading } = useMutation(async (data: addToQuickAccessDto) => {
        const result: any = await api.post(`/file-system/get-website-icon-from-link`, { link: data?.link })
        return { ...data, fileId: result?.data?.[0]?._id }
    },
        {
            onSuccess(data) {
                toast.success("File uploaded successfully")
                addToQuickAccess(data);
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )
    const { mutate: addToQuickAccess, isLoading } = useMutation((data: any) => {
        return api.post(`/quick-access/add`, data)
    },
        {
            onSuccess({ data }) {
                console.log(data?.[0]?._id)
                toast.success("Quick Access added successfully")
                handelClose()
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    const { mutate: editQuickAccess, isLoading: editQuickAccessLoading } = useMutation((data: any) => {
        return api.put(`/quick-access/edit?_id=${data?._id}`, data?.data)
    },
        {
            onSuccess({ data }) {
                toast.success("Quick Access updated successfully")
                handelClose()
            },
            onError(err: any) {
                toast.error(err?.response?.data?.message)
            }
        }
    )

    function onSubmit(data: any) {
        console.log(data)
        if (isEdit) {
            console.log({ data, defaultValue })
            if (defaultValue?.link != data?.link) {
                deleteFile({ _id: defaultValue?._id, fileId: defaultValue?.fileId, data })
            } else {
                editQuickAccess({ _id: defaultValue?._id, fileId: defaultValue?.fileId, data })
            }
        } else {
            getFileId(data)
        }
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => {
                    handelClose()
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <ul className='w-full flex justify-between items-center'>
                        <li className='font-semibold '>{isEdit ? "Edit" : "Add"} Quick Access</li>
                        <li
                            className='cursor-pointer'
                            onClick={() => {
                                handelClose()
                            }}>
                            <CrossIco height={30} width={30} color='red' />
                        </li>
                    </ul>
                </DialogTitle>
                <DialogContent id='addQuickAccess'>
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
                                className='flex flex-col mb-3'
                            >
                                <label className='text-lg mb-1 '>Link</label>
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

                            {!(isLoading || getFileIdIsLoading || editQuickAccessLoading) && <input
                                className='w-full mt-5 full rounded-md p-2.5 bg-gradient-to-r from-purple-400 from-10% via-purple-700 via-80% to-purple-900 font-semibold cursor-pointer text-white'
                                type="submit"
                                value={` ${isEdit ? "Edit" : "Add to"} Quick-Access`}
                            />}
                            {
                                ((isLoading || getFileIdIsLoading || editQuickAccessLoading)) && <Oval height={20} width={20} color='#7e22ce' />
                            }
                        </div>
                        <div></div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddForm
