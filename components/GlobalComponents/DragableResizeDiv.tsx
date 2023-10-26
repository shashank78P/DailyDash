import { Resizable } from 're-resizable'
import React, { useEffect, useRef, useState } from 'react'

type positionDto = {
    x: number,
    y: number
}

interface Props {
    children: React.ReactNode;
    initPosition: positionDto,
    containerWidth: number,
    containerHeight: number,
    containerMinWidth: number,
    containerMinHeight: number,
    containerMaxWidth: number,
    containerMaxHeight: number,
    style? : any
}

const DragableResizeDiv = ({ children, containerHeight, containerWidth, initPosition, containerMaxHeight, containerMaxWidth, containerMinHeight, containerMinWidth , style}: Props) => {

    const [position, setPosition] = useState<any>(initPosition)
    const [width, setWidth] = useState<number>(containerWidth)
    const [height, setHeight] = useState<number>(containerHeight)
    const [afterRsizeWidth, setAfterResizeWidth] = useState<number>(containerMinWidth)
    const [afterResizeHeight, setAfterResizeHeight] = useState<number>(containerMinHeight)

    const onDragHandler = (e: any) => {
        e?.preventDefault()

        let is_in_x_bound: boolean = e?.clientX > 50 && e?.clientX < Math.abs(window.innerWidth - width)
        let is_in_y_bound: boolean = e?.clientY > 0 && e?.clientY < Math.abs(window.innerHeight - height)

        if (is_in_x_bound && is_in_y_bound) {
            setPosition({ x: e?.clientX, y: e?.clientY })
            return;
        }
        else if (is_in_x_bound) {
            setPosition({ x: e.clientX, y: position?.y })
            return;
        }
        else if (is_in_y_bound) {
            setPosition({ x: position?.x, y: e?.clientY })
            return;
        }
    }

    const reSizeHandler = (e: any, direction: any, ref: HTMLElement, d: any) => {
        
        let is_x_in_bound: boolean = (afterRsizeWidth + d.width > containerMinWidth) && (afterRsizeWidth + d.width < containerMaxWidth)
        let is_y_in_bound: boolean = (afterResizeHeight + d.height > containerMinHeight) && (afterResizeHeight + d.height < containerMaxHeight)
        if (is_x_in_bound && is_y_in_bound) {
            setWidth(afterRsizeWidth + d.width)
            setHeight(afterResizeHeight + d.height)
        }
        else if(is_x_in_bound){
            setWidth(afterRsizeWidth + d.width)
        }
        else if(is_y_in_bound){
            setHeight(afterResizeHeight + d.height)
        }
    }

    return (
        <Resizable
            style={{
                top: `${position?.y}px`,
                left: `${position?.x}px`,
                position: "fixed",
                border : "none",
                zIndex : 1000,
                ...style,
            }}
            size={{
                width: width, height: height,
            }}
            onResize={reSizeHandler}
            onResizeStop={(e, direction, ref, d) => {
                setAfterResizeHeight(height)
                setAfterResizeWidth(width)
            }}
        >
            <div className={`fixed`} style={{
                // transform: `${ dragEnd && `translate3d(${position?.x}px, ${position?.y}px, 0)`}`,
                width: `${width}px`,
                height: `${height}px`,
            }}
                draggable
                onDrag={onDragHandler}
                onResize={(e) => {
                    console.log("resizing")
                }}
            >{
                    children
                }
            </div>
        </Resizable>
    )
}

export default DragableResizeDiv
