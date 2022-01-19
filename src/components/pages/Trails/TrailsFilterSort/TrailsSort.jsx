import { TrailsConst } from '../../../../constants';
import Button from '../../../shared/Button';

const TrailsSort = ({
  sortCheckedValue,
  changeSort,
  isShowMobileSortList,
  toggleMobileSortList,
}) => {
  const sortListConst = TrailsConst.sortList;
  return (
    <section id="trails-sort" className={`${isShowMobileSortList ? 'active' : ''}`}>
      <div className="layer"></div>
      <div className="wrap">
        <div className="sorts-container">
          <div className="flex sort-list">
            {sortListConst.map((sortItem, index) => {
              return (
                <label
                  className={`sort-item ${sortCheckedValue === index ? 'active' : ''}`}
                  key={index}
                >
                  <input
                    name="sort"
                    type="radio"
                    value={index}
                    onChange={changeSort}
                    checked={index === sortCheckedValue}
                  />
                  <i className={`fas ${sortItem.iconClassName}`}></i>
                  {sortItem.option}
                </label>
              );
            })}
          </div>
          <Button text={'確認排序'} id={'mobile-confirm-sort-btn'} onClick={toggleMobileSortList} />
        </div>
      </div>
    </section>
  );
};

export default TrailsSort;
