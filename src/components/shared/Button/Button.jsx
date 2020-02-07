import React from 'react';


const Button = ({
    text,
    name,
    onClick
}) => {
    return (
        <button className="basic-btn" id={name} onClick={onClick}>{text}</button>
    )
}

export default Button