import React, { Component } from 'react';
import { DB, APP } from '../../../../lib';
import { youtubeConfig } from '../../../../config';

class Youtube extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null
        }
    }

    componentDidMount() {
        const { title, id } = this.props
        const todayDate = APP.getDay()
        const trailsRef = DB.ref('trails').doc(id)
        trailsRef.get().then(doc => {
            const trailData = doc.data()
            const youtubeList = trailData.youtube_list
            const isNeedToUpdate = () => {
                if (youtubeList === null) {
                    return true
                } else if (todayDate !== youtubeList.update_time) {
                    return true
                } return false
            }

            isNeedToUpdate() ?
                this.UpdateYoutubeVideo(trailsRef, title, todayDate)
                :
                this.setState({
                    youtubeList: youtubeList.data
                })
        })
    }

    UpdateYoutubeVideo = (trailsRef, title, todayDate) => {
        const vedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &order=${ youtubeConfig.order}&q=${title}&key=${youtubeConfig.apiKey}`
        fetch(vedioUrl, { method: 'Get' })
            .then(res => res.json())
            .then(vedioData => {
                let youtubeList = []
                vedioData.items.map(vedioItem => {
                    const channelUrl = `${youtubeConfig.baseUrl}/channels?part=snippet
                            &id=${vedioItem.snippet.channelId}&key=${youtubeConfig.apiKey}`
                    fetch(channelUrl, { method: 'Get' })
                        .then(res => res.json())
                        .then(channelData => {
                            let youtubeItem = {
                                channelPic: channelData.items[0].snippet.thumbnails.default.url,
                                channelTitle: channelData.items[0].snippet.title,
                                videoId: vedioItem.id.videoId,
                                videoTitle: vedioItem.snippet.title
                            }
                            youtubeList.push(youtubeItem)
                        }).then(() => {
                            this.setState({
                                youtubeList: youtubeList
                            })
                            trailsRef.set({
                                youtube_list: {
                                    data: youtubeList,
                                    update_time: todayDate
                                }
                            }, { merge: true })
                        })
                })
            })
    }

    render() {
        const { youtubeList } = this.state
        if (youtubeList === null) {
            return <div></div>
        }
        return (
            <div className="community-info__youtube">
                <h3>Youtube</h3>
                <div className="flex youtube-list">
                    {
                        youtubeList.map(youtube => {
                            return (
                                <div className="youtube-item" key={youtube.videoId}>
                                    <div className="video-container">
                                        <iframe
                                            width="350px"
                                            height="220"
                                            src={`https://www.youtube.com/embed/${youtube.videoId}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen >
                                        </iframe >
                                    </div >
                                    <div className="video-content">
                                        <div className="flex">
                                            <img src={youtube.channelPic} />
                                            <p className="video-title">{youtube.videoTitle}</p>
                                        </div>
                                        <p className="channel-title">{youtube.channelTitle}</p>
                                    </div>
                                </div >
                            )
                        })
                    }
                </div >
            </div >
        )
    }
}

export default Youtube;