import React from 'react'
import uuidv1 from 'uuid/v1'
import './icon-text-input-field.css'
import { DataList } from './../'

const IconTextInputField = ({
  value = '',
  name = '',
  placeholder = '',
  iconSrc = '',
  onChangeAction = ()=>{},
  type = "text",
  rel = 'name',
  isReadOnly = false,
  list = { id: null, options: [] },
  children,
  required = false,
  autoComplete = "true",
  autoCorrect = "false",
  autoFocus = false,
  useIconWithCSS = true,
}) => {
const listId = list.id || `playerslist-${ uuidv1() }`
return (
    <div className="IconTextInputField">
        { (!useIconWithCSS)
        ? <span className="icon-field" role="img" aria-label="Player icon">
            <img alt="" style={{ verticalAlign: 'middle' }} src={ iconSrc } />
        </span>
        : ''
        }
        <input className={ `text-field${ (isReadOnly) ? ' read-only' : '' }` }
                data-icon-src={ (useIconWithCSS) ? iconSrc : null }
                style={ (useIconWithCSS) ? { backgroundImage: `url('${ iconSrc }')` } : null }
                onChange={ onChangeAction }
                name={ name }
                type={ type }
                rel={ rel }
                placeholder={ placeholder }
                autoComplete={ autoComplete }
                autoCorrect={ autoCorrect }
                autoFocus={ autoFocus }
                value={ value }
                readOnly={ isReadOnly }
                list={ (listId) ? listId : '' }
                required={ required }
                />
        { (list.options && list.options.length > 0) ? <DataList id={ listId } options={ list.options } /> : '' }
        { children }
    </div>)
}

export default IconTextInputField
