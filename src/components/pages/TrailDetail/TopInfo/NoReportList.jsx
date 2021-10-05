import React from 'react';
import Button from '../../../shared/Button';

const NoReportList = ({ toggleReportInputBox }) => {
  return (
    <div className="no-report-list">
      <div className="flex wrap">
        <p>
          分享，讓彼此擁有更棒的步道體驗<i className="far fa-smile"></i>
        </p>
        <Button text={'立刻分享步道近況'} id={'first-report-btn'} onClick={toggleReportInputBox} />
      </div>
    </div>
  );
};

export default NoReportList;
