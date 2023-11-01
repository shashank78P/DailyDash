import React, { useCallback } from 'react'
import { toast } from 'react-toastify';

const useCopyToClipboard = () => {
    const copyTextToClipboard = useCallback(async (text: string) => {
        try{
            if (window && window?.navigator && 'clipboard' in window?.navigator) {
                await window?.navigator?.clipboard?.writeText(text);
                toast.success("copied!!")
                return
            } else {
                document?.execCommand('copy', true, text);
                toast.success("copied!!")
                return
            }
        }catch(err){
            toast.error("failed to copy!!")
        }
    }, [])
    return [copyTextToClipboard]
}

export default useCopyToClipboard
