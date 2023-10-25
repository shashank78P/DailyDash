"use client"
import Doc_viewer from '@/components/GlobalComponents/files/DocViewer';
import FileIcons from '@/components/GlobalComponents/files/fileIcons';
import UploadIcon from '@/components/assets/UploadIcon';
import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'


const ImagePostForm = () => {
    const { acceptedFiles, fileRejections, getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject, isFileDialogActive, isFocused } = useDropzone({
        // accept: { "*/*"},
        maxFiles: 10,
        // validator:
    });
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

    const dropzoneClasses = `
    border-2 border-dashed border-gray-400 p-4 m-4 text-center
    ${isDragReject ? 'bg-red-200 border-red-500' : isDragActive ? 'bg-green-200 border-green-500' : 'bg-gray-100 border-gray-400'
        }`;
    return (
        <>
            <section>
                <div {...getRootProps({
                    className: `{ ${dropzoneClasses} w-full h-52 border border-2 flex justify-center items-center}}`
                })}>
                    <input {...getInputProps()} className='invisible' />
                    <ul className='flex flex-col justify-center items-center'>
                        <li className='mb-2'><UploadIcon width={30} height={30} /></li>
                        <li>Drag & Drop or choose to upload</li>
                    </ul>

                </div>
                <h1>Accepte file</h1>
                <ul>{...files}</ul>
                {/* <FileIcons acceptedFiles={acceptedFiles} /> */}

                {/* {isDragAccept && <p>Drop it like it's hot!</p>}
                {isDragReject && <p>File type not supported!</p>}
                {!isDragActive && <p>Drag files here or click to browse</p>}
                <h1>{isDragReject && 'border-red-500' || isDragAccept && 'border-green-500' || isDragActive && 'bg-green-500' || isFileDialogActive && 'border-yellow-500'}</h1> */}
                {
                    acceptedFiles.map((image, i) => {
                        return (
                            <img src={URL.createObjectURL(image)} alt="" key={i}/>
                        )
                    }
                    )
                }
                {/* <Doc_viewer /> */}
            </section>
        </>
    );
};

export default ImagePostForm;
