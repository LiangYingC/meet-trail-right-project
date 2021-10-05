import React from 'react';

const DoubleTextInput = ({
  title,
  type,
  changeValue,
  alterWord,
  idAll,
  idOne,
  idTwo,
  placeholderOne,
  placeholderTwo,
  valueOne,
  valueTwo,
  inputUnitOne,
  inputUnitTwo,
}) => {
  return (
    <div className="form-item">
      <label htmlFor={idOne}>
        {title}
        <span className="mark">*</span>
        <span className="alert-word">
          {alterWord.inputId === idOne || alterWord.inputId === idTwo ? alterWord.word : ''}
        </span>
      </label>
      <div className={idAll}>
        <div className="flex">
          <input
            type={type}
            id={idOne}
            placeholder={placeholderOne}
            value={valueOne}
            onChange={changeValue}
            autoComplete="off"
          />
          {inputUnitOne}
        </div>
        <div className="flex">
          <input
            type={type}
            id={idTwo}
            placeholder={placeholderTwo}
            value={valueTwo}
            onChange={changeValue}
            autoComplete="off"
          />
          {inputUnitTwo}
        </div>
      </div>
    </div>
  );
};

export default DoubleTextInput;
