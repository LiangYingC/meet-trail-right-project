import React from 'react';
import './Button.scss'

const Button = ({ text, name, onClick }) => {
    return (
        <button className={name} onClick={onClick}>{text}</button>
    )
}

export default Button