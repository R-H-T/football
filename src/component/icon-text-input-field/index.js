import React from 'react'
import './icon-text-input-field.css'

const IconTextInputField = ({
  value = '',
  placeholder = '',
  iconSrc = '',
  onChangeAction = ()=>{},
  rel = 'name',
  isReadOnly = false,
  children,
}) => (
<div className="IconTextInputField">
    <span className="icon-field" role="img" aria-label="Player icon">
        <img alt="" style={{ verticalAlign: 'middle' }} src={ iconSrc } />
    </span>
    <input className={ `text-field${ (isReadOnly) ? ' read-only' : '' }` }
            onChange={ onChangeAction }
            type="text"
            rel={ rel }
            placeholder={ placeholder }
            autoComplete="true"
            autoCorrect="false"
            value={ value }
            readOnly={ isReadOnly }
            />
    { children }
</div>)

export default IconTextInputField
