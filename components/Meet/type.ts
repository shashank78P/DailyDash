// @ts-nocheck
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