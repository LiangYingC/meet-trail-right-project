const TrailLocationInput = ({ inputValue, changeValue, locationObj }) => {
  return (
    <div className="form-item">
      <label htmlFor="area">
        步道位置<span className="mark">*</span>
      </label>
      <div className="flex area">
        <select name="location" id="area" value={inputValue.area} onChange={changeValue}>
          <option value="選擇區域" className={`${inputValue.area.length > 0 ? 'inactive' : ''}`}>
            選擇區域
          </option>
          {Object.keys(locationObj).map(area => {
            return (
              <option value={`${area}`} key={area}>
                {area}
              </option>
            );
          })}
        </select>
        <select name="location" id="city" value={inputValue.city} onChange={changeValue}>
          <option value="選擇縣市">選擇縣市</option>
          {inputValue.area.length > 0
            ? Object.keys(locationObj[inputValue.area]).map(city => {
                return (
                  <option value={`${city}`} key={city}>
                    {city}
                  </option>
                );
              })
            : ''}
        </select>
        <select name="location" id="dist" value={inputValue.dist} onChange={changeValue}>
          <option value="選擇鄉鎮">選擇鄉鎮</option>
          {inputValue.city.length > 0
            ? locationObj[inputValue.area][inputValue.city].map(dist => {
                return (
                  <option value={`${dist}`} key={dist}>
                    {dist}
                  </option>
                );
              })
            : ''}
        </select>
      </div>
    </div>
  );
};

export default TrailLocationInput;
