import React from 'react';


const Button = ({ text, name, onClick }) => {
    return (
        <button id={name} onClick={onClick}>{text}</button>
    )
}

export default Button