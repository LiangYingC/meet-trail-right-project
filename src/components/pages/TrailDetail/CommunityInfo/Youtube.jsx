import React, { Component } from 'react';

class Youtube extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null
        }
    }

    componentDidMount() {
        const { title, id } = this.props
        const db = firebase.firestore()
        const trailsRef = db.collection('trails').doc(id)
        const isGetYoutube = sessionStorage.getItem('MTR-isGetYoutube')

        // YouTube Data API 取得資料存進 Firebase
        if (!isGetYoutube) {
            const youtubeConfig = {
                apiKey: 'AIzaSyAdjEsVveMWoqUjvz59GS3KMAwfsBVvKjQ',
                baseUrl: 'https://www.googleapis.com/youtube/v3/search',
                order: 'relevance',
                maxResults: 5
            }
            const url = `${youtubeConfig.baseUrl}?part=snippet&type=video
            &order=${youtubeConfig.order}&q=${title}&key=${youtubeConfig.apiKey}`

            fetch(url, { method: 'Get' })
                .then(res => res.json())
                .then(data => {
                    const youtubeList = data.items.map(item => {
                        return {
                            videoId: item.id.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description
                        }
                    })

                    trailsRef.set({
                        youtube_list: youtubeList,
                    }, { merge: true })

                    sessionStorage.setItem('MTR-isGetYoutube', JSON.stringify(true))
                })
        }

        // 從 Firebase 拿 youtube list 資料
        trailsRef.get().then(doc => {
            this.setState({
                youtubeList: doc.data().youtube_list
            })
        })
    }

    render() {
        const { youtubeList } = this.state
        console.log(youtubeList)
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
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                    <div className="title">{youtube.title}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Youtube