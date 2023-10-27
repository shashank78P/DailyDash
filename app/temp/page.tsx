"use client"
import Doc_viewer from '@/components/GlobalComponents/files/DocViewer';
import FileIcons from '@/components/GlobalComponents/files/fileIcons';
import UploadIcon from '@/components/assets/UploadIcon';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import VideoTemp from './VideoTemp';
import AudioRecord from '@/components/GlobalComponents/Audio/AudioRecorder';
import VideoRecord from '@/components/GlobalComponents/Video/VideoRecord';

const ImagePostForm = () => {
    const [fileId, setFileID] = useState([])

    function readFile(file: any) {
        const reader = new FileReader();

        reader.onload = function (event: any) {
            // The result property contains the file's contents

            const fileContent = event.target.result;

            // You can process the file content here
            console.log(fileContent);
        };

        // Read the file as text, data URL, or other formats based on your needs
        reader.readAsDataURL(file);
    }

    const { acceptedFiles, fileRejections, getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject, isFileDialogActive, isFocused } = useDropzone({
        // accept: { "*/*"},
        maxFiles: 10,
        // validator:
    });

    useEffect(() => {
        acceptedFiles?.map((file, i) => {
            readFile(file)
        })
    }, [acceptedFiles])



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

    const dropzoneClasses = `
    border-2 border-dashed border-gray-400 p-4 m-4 text-center
    ${isDragReject ? 'bg-red-200 border-red-500' : isDragActive ? 'bg-green-200 border-green-500' : 'bg-gray-100 border-gray-400'
        }`;
    console.log(fileId)

    return (
        <>
            <div>
                {/* <VideoRecord /> */}
                {/* <div className='w-[200px]'>
                    <FileIcons acceptedFiles={'audio/wav'} />
                </div> */}
                <audio src='https://drive.google.com/uc?id=1EHMGCwR6S_nhFTV7W7vY37ixHSBOqb4r&export=download' controls />
                {/* <VideoRecord setFileID={setFileID}/>  */}
                {/* <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            /> */}

                {/* <section>
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
                <h1>{isDragReject && 'border-red-500' || isDragAccept && 'border-green-500' || isDragActive && 'bg-green-500' || isFileDialogActive && 'border-yellow-500'}</h1>
                {
                    acceptedFiles.map((image, i) => {
                        return (
                            <img src={URL.createObjectURL(image)} alt="" />
                        )
                    }
                    )
                }
                <Doc_viewer />
            </section> */}
            </div>
        </>
    );
};

export default ImagePostForm;
