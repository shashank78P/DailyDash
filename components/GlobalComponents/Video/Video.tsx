import React from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'
import VideoPreview from './VideoPreview'

const Video = () => {
  return (
    <ReactMediaRecorder
                video
                render={({ previewStream,  status, startRecording, stopRecording, mediaBlobUrl}) => {
                    return (
                        <>
                            <div>
                                <p>{status}</p>
                                <button onClick={startRecording}>Start Recording</button>
                                <button onClick={stopRecording}>Stop Recording</button>
                                <video src={mediaBlobUrl} controls autoPlay loop />
                            </div>
                            <VideoPreview stream={previewStream} />;
                        </>
                    )
                }}
            />
  )
}

export default Video
