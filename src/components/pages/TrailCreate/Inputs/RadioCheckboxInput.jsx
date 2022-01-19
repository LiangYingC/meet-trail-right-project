const RadioCheckboxInput = ({
  title,
  type,
  name,
  listName,
  listConst,
  checkedList,
  changeValue,
}) => {
  return (
    <div className="form-item">
      <label>
        {title}
        <span className="mark">*</span>
      </label>
      <div className="flex">
        <div className={`flex ${listName}`}>
          {listConst.map(item => {
            return (
              <label
                className={`${name} ${checkedList[item.value] ? 'active' : ''}`}
                key={item.value}
              >
                <input
                  id={item.value}
                  name={name}
                  type={type}
                  value={item.value}
                  onChange={changeValue}
                  checked={checkedList[item.value]}
                />
                {type === 'radio' ? <span className="radio-mark"></span> : ''}
                {item.name}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadioCheckboxInput;
