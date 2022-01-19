import { Link } from 'react-router-dom';
import { APP } from '../../../lib';
import LikeButton from '../LikeButton';

const TrailsList = ({ trailsList, toggleLoginBox }) => {
  return (
    <div className="flex trails-list">
      {trailsList.map(trail => {
        return (
          <div className="trail-item" key={trail.id}>
            <Link to={`/trails/detail/${trail.id}`}>
              <div className="trail-img">
                <img src={trail.images.main_image} alt={`${trail.title}圖片`} />
                <LikeButton trailId={trail.id} toggleLoginBox={toggleLoginBox} />
              </div>
              <div className="trail-detail">
                <h3>
                  <i className="fas fa-mountain"></i>
                  {trail.title}
                </h3>
                <p className="trail-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {trail.location.city} {trail.location.dist}
                </p>
                <p className="trail-difficuty">
                  <i className="fas fa-hiking"></i>
                  {trail.difficulty}
                </p>
                <p className="trail-length">
                  <i className="fas fa-map"></i>
                  {trail.length} 公里
                </p>
                <p className="trail-time">
                  <i className="far fa-clock"></i>
                  {APP.transfromTimefromMinToHourMin(trail.time)}
                </p>
                <div className="flex">
                  <p className="trail-like">
                    <i className="fas fa-heart"></i>
                    {trail.like_data.count}
                  </p>
                  <p className="trail-popular">
                    <i className="fas fa-fire"></i>
                    {trail.view_count}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TrailsList;
