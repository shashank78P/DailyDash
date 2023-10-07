import React from 'react'

const IncomingIco = (props: { width: number, height: number, color?: string }) => {
    return (
        <svg
    fill={props?.color ? props?.color : "#202124"}
    width={props?.width} height={props?.height}
    viewBox="0 0 24 24"
    id="right-top-arrow"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
  >
    <line
      id="primary"
      x1={5}
      y1={19}
      x2={19}
      y2={5}
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
      points="19 9 19 5 15 5"
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

export default IncomingIco
