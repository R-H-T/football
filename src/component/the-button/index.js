import React from 'react';
import './the-button.css';

const TheButton = (props) => {
    const { iscancel } = props;
    return (<button { ...props } className={`TheButton${ (iscancel) ? ' cancel' : '' }`}>{ props.children }</button>);
}

export default TheButton;
