import React from 'react';
import Youtube from './Youtube.jsx';

const CommunityInfo = ({ communityInfoData }) => {
  return (
    <section id="trail-detail__community-info">
      <div className="wrap">
        <h2>社群資訊</h2>
        <Youtube title={communityInfoData.title} id={communityInfoData.id} />
      </div>
    </section>
  );
};

export default CommunityInfo;
