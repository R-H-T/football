import React from 'react'

const GWStopwatch = ({ angle = 0 }) => {
    return (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="60" height="67" xmlSpace="preserve" id="stopwatchSymbol">
    <g id="stopwatchSymbol-stopButtonGroup3" transform="translate(14.35, 13.91) rotate(-33.28)" >
        <g id="stopwatchSymbol-stopwatchButton3">
            <ellipse id="stopwatchSymbol-stopwatchStopButtonBody3" stroke="none" fill="rgb(255, 255, 255)" cx="0" cy="-2" rx="4" ry="4.5" />
            <ellipse id="stopwatchSymbol-stopwatchStopButtonFrame3" stroke="rgb(151, 151, 151)" strokeWidth="1" strokeMiterlimit="10" fill="rgb(187, 187, 187)" cx="0" cy="-2" rx="4" ry="4.5" />
        </g>
        <g id="stopwatchSymbol-stopwatchButtonBase3" clipPath="url(#stopwatchSymbol-stopwatchButtonBaseClip2)">
            <clipPath id="stopwatchSymbol-stopwatchButtonBaseClip2">
                <rect x="-5" y="-4.5" width="10" height="11" rx="2" />
            </clipPath>
            <rect id="stopwatchSymbol-stopwatchButtonBaseRectangle3" stroke="rgb(151, 151, 151)" strokeWidth="6" strokeMiterlimit="10" fill="none" x="-5" y="-4.5" width="10" height="11" rx="2" />
        </g>
    </g>
    <g id="stopwatchSymbol-stopButtonGroup2" transform="translate(45.65, 13.91) rotate(34.19)" >
        <g id="stopwatchSymbol-stopwatchButton2">
            <ellipse id="stopwatchSymbol-stopwatchStopButtonBody2" stroke="none" fill="rgb(255, 255, 255)" cx="-0" cy="-2" rx="4" ry="4.5" />
            <ellipse id="stopwatchSymbol-stopwatchStopButtonFrame2" stroke="rgb(151, 151, 151)" strokeWidth="1" strokeMiterlimit="10" fill="rgb(187, 187, 187)" cx="-0" cy="-2" rx="4" ry="4.5" />
        </g>
        <g id="stopwatchSymbol-stopwatchButtonBase2" clipPath="url(#stopwatchSymbol-stopwatchButtonBaseClip)">
            <clipPath id="stopwatchSymbol-stopwatchButtonBaseClip">
                <rect x="-5" y="-4.5" width="10" height="11" rx="2" />
            </clipPath>
            <rect id="stopwatchSymbol-stopwatchButtonBaseRectangle2" stroke="rgb(151, 151, 151)" strokeWidth="6" strokeMiterlimit="10" fill="none" x="-5" y="-4.5" width="10" height="11" rx="2" />
        </g>
    </g>
    <g id="stopwatchSymbol-stopButtonGroup">
        <g id="stopwatchSymbol-stopwatchButton">
            <circle id="stopwatchSymbol-stopwatchStopButtonBody" stroke="none" fill="rgb(255, 255, 255)" cx="30" cy="6" r="5" />
            <circle id="stopwatchSymbol-stopwatchStopButtonFrame" stroke="rgb(151, 151, 151)" strokeWidth="1" strokeMiterlimit="10" fill="rgb(187, 187, 187)" cx="30" cy="6" r="5" />
        </g>
        <g id="stopwatchSymbol-stopwatchButtonBase" clipPath="url(#stopwatchSymbol-stopwatchButtonBaseClip1)">
            <clipPath id="stopwatchSymbol-stopwatchButtonBaseClip1">
                <rect x="24" y="3" width="12" height="13" rx="2" />
            </clipPath>
            <rect id="stopwatchSymbol-stopwatchButtonBaseRectangle" stroke="rgb(151, 151, 151)" strokeWidth="6" strokeMiterlimit="10" fill="none" x="24" y="3" width="12" height="13" rx="2" />
        </g>
    </g>
    <circle id="stopwatchSymbol-stopwatchBody" stroke="none" fill="rgb(255, 255, 255)" cx="30" cy="37" r="28" />
    <circle id="stopwatchSymbol-stopwatchBodyFrame" stroke="rgb(151, 151, 151)" strokeWidth="4" strokeMiterlimit="10" fill="none" cx="30" cy="37" r="28" />
    <path id="stopwatchSymbol-stopwatchPin" stroke="rgb(136, 136, 136)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none" d="M 0,5 L 0,-23" transform={`translate(30, 37) rotate(${ angle })`} />
    <circle id="stopwatchSymbol-stopwatchPinHolder" stroke="rgb(128, 128, 128)" strokeWidth="1" strokeMiterlimit="10" fill="rgb(255, 255, 255)" cx="0" cy="-0" r="4"  transform="translate(30, 37)" />
</svg>)
}

export default GWStopwatch
