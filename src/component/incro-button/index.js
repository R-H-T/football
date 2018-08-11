import React from 'react'
import './incro-button.css'

const IncroButton = ({
  addAction = ()=>{},
  removeAction = ()=>{},
  value = 0,
  ariaLabel = null,
  limit = { min: 0, max: 99999 },
  isDisabled = false,
  }) => {
    const finalValue = (value >= limit.max)
    ? limit.max
    : (value <= limit.min)
    ? limit.min
    : value
    const valueString = finalValue.toString()
    const isThousand =  ((finalValue >= 1000) || (finalValue <= -1000))
    const isNegative = (finalValue < 0)
    return (
    <div
      className="IncroButton IncroButton-btn-group"
      data-subk={ (isThousand)
        ? `- ${ parseInt(valueString.substr((valueString.length - 3), 3), 0) } -`
        : ''}>
  <button
    onClick={ (finalValue > limit.min  && !isDisabled)
              ? removeAction : ()=>{} }
    className="negative-action"
    disabled={ (finalValue <= limit.min || isDisabled) }>-</button>
  <input
    className={`number-badge${
      (isThousand)
      ? ' thousand' : '' }${
        (isNegative) ? ' negative' : ''
      }`
    }
    type="text"
    aria-label={ ariaLabel || `The current value is ${ valueString }` }
    value={
      (( (isThousand)
      ? `${ Math.trunc( finalValue / 1000 ) }k`
      : valueString ) || 0)
    }
    readOnly
    disabled={ isDisabled } />
  <button
    onClick={
      (finalValue < limit.max && !isDisabled)
      ? addAction : ()=>{}
    }
    disabled={ (finalValue >= limit.max || isDisabled) }>+</button>
</div>)
}

export default IncroButton
