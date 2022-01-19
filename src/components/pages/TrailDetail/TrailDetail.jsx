import { Component } from 'react';
import { DB } from '../../../lib';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TopInfo from './TopInfo';
import BasicInfo from './BasicInfo';
import CommunityInfo from './CommunityInfo';
import TrafficInfo from './TrafficInfo';
import LoadingWave from '../../shared/LoadingWave';

class TrailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailData: null,
      weatherData: null,
    };
  }
  componentDidMount() {
    const trailId = this.props.match.params.id;
    this.getTrailData(trailId);
    this.addTrailViewCount(trailId);
  }

  componentWillUnmount() {
    this.unsubscribeGetTrail();
  }

  getTrailData = trailId => {
    this.unsubscribeGetTrail = DB.ref('trails')
      .doc(trailId)
      .onSnapshot(doc => {
        const trailData = doc.data();
        this.getTrailCreateUserData(trailData.create_user_id, trailData);
      });
  };

  getTrailCreateUserData = (userId, trailData) => {
    DB.ref('users')
      .doc(userId)
      .get()
      .then(doc => {
        const userData = doc.data();
        const newTrailData = {
          ...trailData,
          createUser: {
            id: userData.id,
            name: userData.name,
            picture: userData.picture,
          },
        };
        this.setState({
          trailData: newTrailData,
        });
      });
  };

  addTrailViewCount = trailId => {
    DB.ref('trails')
      .doc(trailId)
      .get()
      .then(doc => {
        const trailData = doc.data();
        DB.ref('trails')
          .doc(trailId)
          .update({
            view_count: trailData.view_count + 1,
          });
      });
  };

  render() {
    const { trailData, weatherData } = this.state;
    const { history } = this.props;
    if (trailData === null) {
      return (
        <>
          <Header />
          <div className="trail-detail-loading">
            <LoadingWave />
          </div>
        </>
      );
    } else {
      const topInfoData = {
        id: trailData.id,
        title: trailData.title,
        mainImage: trailData.images.main_image,
        createTime: trailData.create_time,
        createUser: trailData.createUser,
        weatherData: weatherData,
        location: trailData.location,
      };
      const basicInfoData = {
        description: trailData.description,
        scenery: trailData.scenery,
        location: trailData.location,
        height: trailData.height,
        time: trailData.time,
        length: trailData.length,
        difficulty: trailData.difficulty,
      };

      const communityInfoData = {
        id: trailData.id,
        title: trailData.title,
      };

      const trafficInfoData = {
        id: trailData.id,
        title: trailData.title,
        routeImage: trailData.images.route_image,
        start: trailData.routes.start,
        end: trailData.routes.end,
        type: trailData.routes.type,
      };

      return (
        <>
          <Header history={history} />
          <TopInfo topInfoData={topInfoData} />
          <BasicInfo basicInfoData={basicInfoData} />
          <CommunityInfo communityInfoData={communityInfoData} />
          <TrafficInfo trafficInfoData={trafficInfoData} />
          <Footer />
        </>
      );
    }
  }
}

export default TrailDetail;
