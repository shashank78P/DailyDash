// @ts-nocheck
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

export const createCustomStream = () => {
    // const ctx = new AudioContext();
    // const oscillator = ctx.createOscillator();
    // const dst = oscillator.connect(ctx.createMediaStreamDestination());
    // oscillator.start();
    // // @ts-ignore
    // return dst.stream
    // return Object.assign(track, { enabled: false });

    // video stream
    const width =200
    const height =200

    const canvas : HTMLCanvasElement = Object.assign(document.createElement('canvas'), { width, height });
    if(canvas){
        canvas?.getContext('2d').fillRect(0, 0, width, height);
    }

    return canvas.captureStream();
};