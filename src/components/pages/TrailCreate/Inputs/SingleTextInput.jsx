import React from 'react';

const SingleTextInput = ({
    title,
    type,
    id,
    placeholder,
    value,
    changeValue,
    alterWord,
    inputUnit
}) => {
    return (
        <div className="form-item">
            <label htmlFor={id}>
                {title}
                <span className="mark">*</span>
                <span className="alert-word">
                    {alterWord.inputId === id ? alterWord.word : ''}
                </span>
            </label>
            <div className={id}>
                {
                    type === 'textarea' ?
                        <textarea
                            type={type}
                            id={id}
                            placeholder={placeholder}
                            value={value}
                            onChange={changeValue}
                            autoComplete="off"
                        > </textarea>
                        :
                        <input
                            type={type}
                            id={id}
                            placeholder={placeholder}
                            value={value}
                            onChange={changeValue}
                            autoComplete="off"
                        />
                }
                {inputUnit}
            </div>
        </div>

    )
}

export default SingleTextInput;