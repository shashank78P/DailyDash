export function mediaAction(isVideoOn: boolean, isAudioOn: boolean) {
    return new Promise((resolve, reject) => {
        console.log("==================================")
        // @ts-ignore
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // @ts-ignore
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: isVideoOn, audio: isAudioOn }, function (stream: MediaStream) {
                resolve(stream);
            }, function (err: any) {
                reject(err);
            });
        } else {
            reject(new Error("getUserMedia not supported"));
        }
    });
}
