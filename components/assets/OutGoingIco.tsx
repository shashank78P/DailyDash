import React from 'react'

const OutGoingIco = (props: { width: number, height: number, color?: string }) => {
  return (
    <svg
    width={props?.width} height={props?.height}
    fill={props?.color ? props?.color : "#202124"}
    viewBox="0 0 24 24"
    id="left-bottom-arrow"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
  >
    <line
      id="primary"
      x1={19}
      y1={5}
      x2={5}
      y2={19}
      style={{
        fill: "none",
        stroke: props?.color ? props?.color : "#202124",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <polyline
      id="secondary"
      points="5 15 5 19 9 19"
      style={{
        fill: "none",
        stroke: props?.color ? props?.color : "#202124",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
  )
}

export default OutGoingIco
