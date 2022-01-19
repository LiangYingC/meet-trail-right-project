const ProfileNoList = ({ text }) => {
  return (
    <div className="flex empty-list">
      <div className="empty-img">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo-empty.png?alt=media&token=111f02e5-c068-4bb0-8b81-e878297b7dfe"
          alt="選山步道黑白 logo"
        />
      </div>
      <div className="empty-word">{text}</div>
    </div>
  );
};

export default ProfileNoList;
