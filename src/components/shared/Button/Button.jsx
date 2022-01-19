const Button = ({ text, id, onClick }) => {
  return (
    <button className="basic-btn" id={id} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
