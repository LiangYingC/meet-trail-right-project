import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { googleMapConfig } from '../../../../config';

class GoogleMapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapCenter: {
                lat: null,
                lng: null
            },
            isShowInfoWindow: false,
            activeMarker: {}
        }
    }

    setMapCenter = (mapProps, map) => {
        const { google } = mapProps
        const service = new google.maps.places.PlacesService(map)

        const { trailTitle } = this.props
        const request = {
            query: `${trailTitle}`,
            fields: ['ALL']
        }

        service.findPlaceFromQuery(request, data => {
            this.setState({
                mapCenter: {
                    lat: data[0].geometry.location.lat(),
                    lng: data[0].geometry.location.lng()
                }
            })
        })
    }

    onMarkerClick = (trailTitle) => {
        window.open(`https://www.google.com.tw/maps/search/${trailTitle}`, 'Go to Google Map')
    }

    render() {
        const { mapCenter } = this.state
        const { trailTitle, google } = this.props
        return (
            <Map
                google={google}
                onReady={this.setMapCenter}
                zoom={16}
                style={{
                    width: '100%',
                    height: '100%',
                    left: '25%',
                    transform: 'translateX(-25%)'
                }}
                initialCenter={{
                    lat: '24.181623',
                    lng: '121.281346'
                }}
                center={mapCenter}
            >
                <Marker
                    name={trailTitle}
                    position={mapCenter}
                    onClick={() => this.onMarkerClick(trailTitle)}
                />
            </ Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: googleMapConfig.apiKey,
    language: 'zh-TW'
})(GoogleMapContainer);

