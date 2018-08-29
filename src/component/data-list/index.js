import React from 'react'
import './data-list.css'

const DataList = ({ id = '', options = [], onSelectChange=(event)=>{} }) => {
    const optionElements = options.map(option => <option key={ option }>{ option }</option>)
    const isDatalistSupported = ('options' in document.createElement('datalist'))
    return (
        (options.length > 0) ? (
        (isDatalistSupported)
            ? (<datalist className="DataList" id={ id }>{ optionElements }</datalist>)
            : (<select className="DataList fb" id={ id } onChange={ onSelectChange }><option name="new">New player...</option>{ optionElements }</select>)
        )
        : ''
    )
}

export default DataList
