import React, { useCallback, useEffect, useRef, useState } from 'react';
import UploadIcon from '@/components/assets/UploadIcon';
import { useDropzone } from 'react-dropzone'

interface DragAndDropFileInputDto {
    maxFiles: number,
    multiple: boolean,
    maxSize: number,
    minSize: number,
    setPreView: Function,
    isShowError: boolean,
    setFiles: Function,
    preView?: Array<String>,
}

interface fileAcceptError {
    message: string[],
    fileName: string,
}

const DragAndDropFileInput = ({ maxFiles, multiple, maxSize, minSize, setPreView, isShowError, setFiles }: DragAndDropFileInputDto) => {
    // function readFile(file: any) {
    //     const reader = new FileReader();

    //     reader.onload = function (event: any) {
    //         const fileContent = event.target.result;
    //         console.log(fileContent);
    //     };
    //     reader.readAsDataURL(file);
    // }

    const { acceptedFiles, fileRejections, getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject, isFileDialogActive, isFocused } = useDropzone({
        accept: { 'image': ['image/jpg', 'image/jpeg'] },
        maxFiles, multiple, maxSize, minSize
        // validator:
    });
    const [errorData, setErrorData] = useState<fileAcceptError>();

    useEffect(() => {


        const temp: Array<any> = [];
        Promise.all(acceptedFiles.map((image, i) => {
            temp.push(URL.createObjectURL(image))
        }))
        setPreView((prev: Array<any>) => { return [...prev, ...temp] })
        setFiles(acceptedFiles)
    }, [acceptedFiles])

    // useEffect(() => {
    //     acceptedFiles?.map((file, i) => {
    //         readFile(file)
    //     })
    // }, [acceptedFiles])



    // {
    //     // 'application/*': [".pdf", ".JPEG"],
    //     "*/*": ['.*']
    //     // 'image/*': [".jpeg"],
    //     // 'text/html': [".html", ".htm"],
    // },
    // maxSize: 1000000,
    // maxSize: 213016,

    const files = acceptedFiles.map((file, i) =>
        <li key={i}>
            {file.name} - {file.size}
        </li>
    )

    console.log(acceptedFiles)
    console.log(fileRejections)

    const dropzoneClasses = `
    border-2 border-dashed border-slate-500 p-4 text-center
    ${isDragReject ? 'bg-red-50 border-red-500' : isDragActive ? 'bg-slate-100 border-slate-500' : 'bg-slate-50 border-slate-500'
        }`;
    return (
        <>
            <section>
                <div {...getRootProps({
                    className: `{ ${dropzoneClasses} w-full h-full border border-2 flex justify-center items-center m-0}}`
                })}>
                    <input {...getInputProps()} className='invisible' />
                    <ul className='flex flex-col justify-center items-center'>
                        <li className='mb-2'><UploadIcon width={30} height={30} /></li>
                        <li className='text-sm'>Drag & Drop or choose to upload</li>
                    </ul>
                </div>
                {isShowError && <div>
                    {
                        fileRejections?.map((rejected: any, i: number) => {
                            return (
                                <>
                                    <ul key={i} className='text-sm my-2'>
                                        <li className='text-red-500'>{rejected?.file?.name}</li>
                                        {
                                            rejected?.errors?.map((err: any, i: number) => {
                                                return <>
                                                    <li className='ml-2 text-red-500'>
                                                        {err?.message}
                                                    </li>
                                                </>
                                            })
                                        }

                                    </ul>
                                </>
                            )
                        })
                    }
                </div>}
                {/* <Doc_viewer /> */}
            </section>
        </>
    )
}

export default DragAndDropFileInput
