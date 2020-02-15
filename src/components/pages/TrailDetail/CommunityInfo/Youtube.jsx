import React, { Component } from 'react';
import { DB, APP } from '../../../../lib'

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

        // 從 Firebase 拿 youtube list 資料
        trailsRef.get().then(doc => {
            const youtubeList = doc.data().youtube_list
            const isNeedToUpdate = () => {
                if (youtubeList === null) {
                    return true
                } else if (todayDate !== youtubeList.update_time) {
                    return true
                } return false
            }

            // 如果更新日期不是今天或尚無資料，從 YouTube Data API 取得資料存進 Firebase
            if (isNeedToUpdate()) {
                const youtubeConfig = {
                    apiKey: 'AIzaSyAdjEsVveMWoqUjvz59GS3KMAwfsBVvKjQ',
                    baseUrl: 'https://www.googleapis.com/youtube/v3',
                    order: 'relevance',
                    maxResults: 5
                }
                // 取得 Video 資料
                const vedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &order=${ youtubeConfig.order}&q=${title}&key=${youtubeConfig.apiKey}`

                fetch(vedioUrl, { method: 'Get' })
                    .then(res => res.json())
                    .then(vedioData => {

                        let youtubeList = []
                        vedioData.items.map(vedioItem => {
                            // 取得 channel 資料
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
                                    // 放進 Firebase 資料庫
                                    trailsRef.set({
                                        youtube_list: {
                                            data: youtubeList,
                                            update_time: todayDate
                                        }
                                    }, { merge: true })
                                })

                        })
                    })
            } else {
                this.setState({
                    youtubeList: youtubeList.data
                })
            }
        })
    }

    processTitel = (title, n) => {
        const l = title.length
        if (l <= n) return title

        return title.slice(0, n - 6) + "..."
    }


    render() {
        const { youtubeList } = this.state

        if (youtubeList === null) {
            return <div>Loading</div>
        }

        return (
            <div className="community-info__youtube">
                <h3>Youtube</h3>
                <div className="flex youtube-list">
                    {
                        youtubeList.map(youtube => {
                            return (
                                <div className="youtube-item">
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
                                            <img src={youtube.channelPic} alt={`${youtube.channelTitle}圖片`} />
                                            <p className="video-title">{this.processTitel(youtube.videoTitle, 45)}</p>
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

export default Youtube