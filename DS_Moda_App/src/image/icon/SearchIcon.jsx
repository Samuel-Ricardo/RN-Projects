import React from 'react'
import Svg, { Circle, G, Path } from 'react-native-svg'

export default ({width, height, fill_1, fill_2}) => {

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlnsSvgjs="http://svgjs.com/svgjs"
      version="1.1"
      width={width}
      height={height}
      x="0" y="0"
      viewBox="0 0 64 64"
      style={{}}
      xmlSpace="preserve"
      class=""><G><Circle xmlns="http://www.w3.org/2000/svg" cx="43.001" cy="43"fill={fill_1 !== undefined ? fill_1 : "#3e3ef4"}r="5.5" data-original="#3e3ef4" style={{}} /><Path xmlns="http://www.w3.org/2000/svg" d="m62.19027 55.85449-4.91518-4.915a1.49955 1.49955 0 0 0 -2.12116 0l-.6924.69239-1.33317-1.33313a12.54381 12.54381 0 1 0 -2.82821 2.82812l1.33317 1.33313-.6924.69238a1.49942 1.49942 0 0 0 0 2.1211l4.91518 4.915a4.48563 4.48563 0 0 0 6.33417.001l.001-.001a4.485 4.485 0 0 0 -.001-6.33399zm-19.18903-4.35449a8.5 8.5 0 1 1 8.50024-8.5 8.51026 8.51026 0 0 1 -8.50024 8.5z" fill={fill_1 !== undefined ? fill_1 : "#3e3ef4"} data-original="#3e3ef4" style={{}} /><Path xmlns="http://www.w3.org/2000/svg" d="m16.00045 40.5a1.50041 1.50041 0 0 0 -1.5 1.5v4a2.50008 2.50008 0 0 1 -5.00015 0v-4a1.5 1.5 0 0 0 -3.00009 0v4a5.50016 5.50016 0 0 0 11.00032 0v-4a1.50041 1.50041 0 0 0 -1.50008-1.5z" fill={fill_2 !== undefined ? fill_2 : "#000000"} data-original="#000000" style={{}} class="" /><Path xmlns="http://www.w3.org/2000/svg" d="m50.00144 60.5h-28.00033l.39992-.5332a5.5339 5.5339 0 0 0 1.09964-3.2998v-18.667a3.5043 3.5043 0 0 0 -3.5001-3.5h-3.64857l1.89367-13.56934a.50225.50225 0 0 1 .49509-.43066h1.75982v3.5a1.5 1.5 0 0 0 3.00009 0v-3.5h17.00049v3.5a1.5 1.5 0 0 0 3.00009 0v-3.5h1.75982a.50225.50225 0 0 1 .49513.43066l.876 6.27637a1.49975 1.49975 0 0 0 2.9708-.41403l-.876-6.27637a3.514 3.514 0 0 0 -3.46593-3.01663h-1.75982v-5.5a11.50034 11.50034 0 0 0 -23.00067 0v5.5h-1.75982a3.514 3.514 0 0 0 -3.46592 3.0166l-1.95147 13.9834h-9.32327a3.5043 3.5043 0 0 0 -3.5001 3.5v18.667a5.5339 5.5339 0 0 0 1.09964 3.2998l2.20026 2.93359a1.50276 1.50276 0 0 0 1.20023.59961h45.00131a1.5 1.5 0 1 0 0-3zm-26.50077-48.5a8.50025 8.50025 0 0 1 17.00049 0v5.5h-17.00049zm-19.50057 46.166a2.514 2.514 0 0 1 -.5-1.499v-18.667a.501.501 0 0 1 .5-.5h16.00047a.501.501 0 0 1 .5.5v18.667a2.514 2.514 0 0 1 -.5 1.499l-1.75 2.334h-12.50042z" fill={fill_2 !== undefined ? fill_2 : "#000000"} data-original="#000000" style={{}} class="" /></G></Svg>

  )
}
