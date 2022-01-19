import { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ProfileNoList from './ProfileNoList.jsx';
import AuthUserContext from '../../../contexts/AuthUserContext';
import LoadingWave from '../../shared/LoadingWave';
import { DB } from '../../../lib/index.js';

class ProfileReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportList: null,
    };
  }

  componentDidMount() {
    const { userData } = this.context;
    DB.ref('users')
      .doc(userData.id)
      .collection('report_list')
      .orderBy('timestamp', 'desc')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          this.setState({
            reportList: [],
          });
        } else {
          let reportList = [];
          querySnapshot.forEach(doc => {
            const reportData = doc.data();
            DB.ref('trails')
              .doc(reportData.report_trail_id)
              .get()
              .then(trailData => {
                reportList.push({
                  trail: {
                    id: trailData.data().id,
                    title: trailData.data().title,
                    picture: trailData.data().picture,
                  },
                  time: reportData.report_time,
                  content: reportData.report_content,
                });
                this.setState({
                  reportList: reportList,
                });
              });
          });
        }
      });
  }

  render() {
    const { reportList } = this.state;
    if (reportList === null) {
      return (
        <>
          <div className="title">
            <h2>步道近況回報</h2>
          </div>
          <LoadingWave />
        </>
      );
    }
    return (
      <>
        <div className="title">
          <h2>步道近況回報</h2>
        </div>
        <div className="num-list">
          <p>
            目前有 <span>{reportList.length}</span> 則步道近況回報
          </p>
        </div>

        {reportList.length === 0 ? (
          <ProfileNoList text={'目前尚無收藏的步道喔'} />
        ) : (
          <div className="report-list">
            <div className="wrap">
              {reportList.map(item => {
                return (
                  <Link to={`/trails/detail/${item.trail.id}`} key={item.trail.id}>
                    <div className={`report-item-container key=${item.trail.id}`}>
                      <div className="flex report-item">
                        <div className="flex report-item-subcontainer">
                          <div className="icon">
                            <i className="fas fa-bullhorn"></i>
                          </div>
                          <div className="time">{item.time.slice(0, 10)}</div>
                          <div className="title">{item.trail.title}</div>
                        </div>
                        <div className="content">{item.content}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}

ProfileReport.contextType = AuthUserContext;
export default ProfileReport;
