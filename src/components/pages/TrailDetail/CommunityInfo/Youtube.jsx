import React, { Component } from 'react';


class Youtube extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null
        }
    }

    componentDidMount() {
        const { title } = this.props

        // YouTube Data API 取得資料
        const youtubeConfig = {
            apiKey: 'AIzaSyAdjEsVveMWoqUjvz59GS3KMAwfsBVvKjQ',
            baseUrl: 'https://www.googleapis.com/youtube/v3/search',
            order: 'relevance',
            maxResults: 3
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
                this.setState({
                    youtubeList: youtubeList
                })

            })
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
                                    <iframe width="350px" height="220" src={`https://www.youtube.com/embed/${youtube.videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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