import React, { useState } from 'react'

export const Select = ({ defaultOptionText = 'Select...', onChange, options = [], name, addDefault = true }) => {
    const [inputValue, setInputValue] = useState('')

    const onUpdate = (event) => {
        if (onChange) {
            onChange(event)
        } else {
            setInputValue(event.target.value)
        }
    }

    return (
        <select name={name} value={inputValue} onChange={onUpdate}>
            {addDefault && <option key="default" value="">{defaultOptionText}</option>}
            {options.map(option => <option key={option.content}>{option.content}</option>)}
        </select>
    )
}

export default Select
