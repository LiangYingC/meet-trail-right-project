import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Button from '../../../shared/Button';

const mapStyles = {
    width: '100%',
    height: '100%',
    left: '25%',
    transform: 'translateX(-25%)'
};

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

    fetchPlaces = (mapProps, map) => {
        // 利用 Palces API 找到步道經緯度
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
                    lat: data[0].geometry.location.lat() - 0.00015,
                    lng: data[0].geometry.location.lng()
                }
            })
        })
    }

    onMarkerClick = (marker) => {
        this.setState({
            activeMarker: marker,
            isShowInfoWindow: true
        })
    }

    render() {
        const { mapCenter, isShowInfoWindow, activeMarker } = this.state
        const { trailTitle, google } = this.props
        return (
            <Map
                google={google}
                onReady={this.fetchPlaces}
                zoom={16}
                style={mapStyles}
                initialCenter={{
                    lat: '24.181623',
                    lng: '121.281346'
                }}
                center={mapCenter}
            >
                <Marker
                    name={trailTitle}
                    position={mapCenter}
                    onClick={this.onMarkerClick}
                />
                <InfoWindow
                    marker={activeMarker}
                    visible={isShowInfoWindow}
                >
                    <div>
                        <h1>{trailTitle}</h1>
                    </div>
                </InfoWindow>

            </ Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBMv6UqgFjQ2tL10bnCTH2765cpmDW_xnI',
    language: 'zh-TW'
})(GoogleMapContainer);

