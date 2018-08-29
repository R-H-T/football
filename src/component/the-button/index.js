import React from 'react'
import './the-button.css'

const TheButton = (props) => {
    const { iscancel, className } = props
    return (
        <button
            { ...props }
            className={ `TheButton${ (iscancel) ? ' cancel' : '' }${ (className) ? ` ${ className }` : '' }` }
        >{ props.children }</button>)
}

export default TheButton
