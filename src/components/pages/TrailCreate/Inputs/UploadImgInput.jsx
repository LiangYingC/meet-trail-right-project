const UploadImgInput = ({
  title,
  id,
  imgValue,
  changeValue,
  isShowImgLoading,
  reminderContent,
}) => {
  return (
    <div className="form-item">
      <label>
        {title}
        <span className="mark">*</span>
      </label>
      <div className="flex upload-img-wrap">
        <label htmlFor={id} className={`upload-area ${id}`}>
          <i className="far fa-image">
            <p>
              <i className="fas fa-plus-circle"></i>點擊上傳
            </p>
          </i>
          <img src={imgValue} alt="上傳的步道圖片" />
          <div
            className={`loading-img-wrap 
                        ${isShowImgLoading.id === id ? 'active' : ''}
                        `}
          >
            <div className="layer"></div>
            <div className="loading-img">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="loaging-word">{isShowImgLoading.progress} %</div>
          </div>
        </label>
        <div className="upload-img">
          <input
            type="file"
            id={id}
            name="upload-img"
            onChange={changeValue}
            accept="image/png,image/jpeg,image/jpg"
          />
        </div>
        <div className="flex reminder">
          <div className="reminder-icon">
            <i className="fas fa-exclamation"></i>
          </div>
          <div className="reminder-content">{reminderContent}</div>
        </div>
      </div>
    </div>
  );
};

export default UploadImgInput;
