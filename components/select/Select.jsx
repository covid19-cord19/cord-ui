import React, { useState } from 'react'
import { select } from './select.module.scss'

export const Select = ({ defaultOptionText = 'Select...', onChange, options = [], name = '', addDefault = true }) => {
    const [inputValue, setInputValue] = useState('')

    const onUpdate = (event) => {
        setInputValue(event.target.value)

        if (onChange) {
            onChange(event)
        }
    }

    return (
        <select name={name} value={inputValue} onChange={onUpdate} className={select}>
            {addDefault && <option key="default" value="">{defaultOptionText}</option>}
            {options.map((option, index) =>
                <option key={option.content || option} value={index}>{option.content || option}</option>)}
        </select>

    )
}


export default Select
