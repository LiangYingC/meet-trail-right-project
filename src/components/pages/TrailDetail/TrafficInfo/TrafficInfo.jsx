import React, { Component } from 'react';
import GoogleMap from './GoogleMap.jsx'
import { DB } from '../../../../lib/index.js';

const TrafficInfo = ({ trafficInfoData }) => {

    const changeImgValue = (e) => {
        const file = e.target.files[0]
        const fileTitle = trafficInfoData.title
        const uploadTask = DB.storageRef(`/trails/${fileTitle}/${fileTitle}路線圖`).put(file)

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, error => {
            console.log(error)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    DB.ref('trails').doc(trafficInfoData.id)
                        .set({
                            images: {
                                route_image: downloadURL
                            }
                        }, { merge: true })
                })
        })
    }

    return (
        <section id="trail-detail__traffic-info">
            <div className="wrap">
                <h2>路線資訊</h2>
                <div className="traffic-info__trail-map">
                    <h3>步道路線圖</h3>
                    <div className="flex route-content">
                        <div className="flex start-and-end">
                            <div className="flex">
                                <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhikingIcon%2F%E4%B8%8A%E5%B1%B1.png?alt=media&token=da1b6e23-f3ba-43eb-99f5-05a51424f5e8" alt="上山圖" />
                                <p>推薦步道起點：<span>{trafficInfoData.start}</span></p>
                            </div>
                            <div className="flex" >
                                <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhikingIcon%2F%E4%B8%8B%E5%B1%B1.png?alt=media&token=9ab0487b-1006-4a35-ada9-0964aa888d48" alt="下山圖" />
                                <p>推薦步道終點：<span>{trafficInfoData.end}</span></p>
                            </div>
                            <div className="flex" >
                                <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhikingIcon%2F%E8%B7%AF%E5%BE%91.png?alt=media&token=c0a30495-f666-489b-b6b1-7cbaf373d3c0" alt="路徑圖" />
                                <p>推薦步道型態：<span>{trafficInfoData.type}</span></p>
                            </div>
                            {
                                trafficInfoData.routeImage ?
                                    <a href={trafficInfoData.routeImage} target="_blank">
                                        <button className="basic-btn">
                                            看大圖
                                        </button>
                                    </a> : ''
                            }

                        </div>
                        {
                            trafficInfoData.routeImage ?
                                <div className="route-map">
                                    <img src={trafficInfoData.routeImage}
                                        alt={`${trafficInfoData.title}路線圖`} />
                                </div> :
                                <div className="upload-route-img-wrap">
                                    <label htmlFor="upload-route-img" className="upload-route-img">
                                        <i className="far fa-image">
                                            <p><i className="fas fa-plus-circle"></i>點擊上傳路線圖</p>
                                        </i>
                                        <input
                                            type="file"
                                            id="upload-route-img"
                                            name="upload-img"
                                            onChange={changeImgValue}
                                            accept="image/png,image/jpeg,image/jpg"
                                        />
                                    </label>
                                </div>
                        }
                    </div>
                </div>
                <div className="traffic-info__google-map">
                    <h3>Google 地圖</h3>
                    <div className="google-map">
                        <GoogleMap trailTitle={trafficInfoData.title} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrafficInfo;