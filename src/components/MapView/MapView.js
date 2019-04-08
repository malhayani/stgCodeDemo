import React, { Component } from 'react';
import './MapView.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedStudio: {},
            activeMarker: {},
            showMoreInfo: false,
            mapMarkers: []
        }
        this.map = React.createRef()
        this.onMarkerMounted = el => {
            if (el) {
                this.setState(prevState => ({
                    mapMarkers: [...prevState.mapMarkers, el.marker]
                }))
            }
        }
    }

    // Generates the View Port for the Map based on State
    generateMapConfig = () => {
        return {
            center: this.props.currentStudio.name ? 
                { lat: this.props.currentStudio.latitude, lng: this.props.currentStudio.longitude } : 
                { lat: 38.523452, lng: -97.534532 },
            zoom: this.props.currentStudio.name ? 15 : 4,
            size: { 'width': '100%', 'height': '60vh' }
        }
    }

    // Displays the Information Window
    onMarkerClick = (props, marker) => {
        this.setState({
            selectedStudio: props,
            activeMarker: marker,
            showMoreInfo: true
        })
    }

    // Hides the Information Window
    onMapClick = () => {
        if (this.state.showMoreInfo) {
            this.setState({
                showMoreInfo: false,    
                activeMarker: {}
            })
        }
    }

    // Calculates the distance between user location and studio marker
    calculateClosest (userLocation, markerLocation) {
        const radius = 6371 // radius of Earth
        const toRad = (degree) => { return degree * ( Math.PI / 180 ) }
        let dlat  = toRad(userLocation.lat - markerLocation.lat)
        let dlong = toRad(userLocation.lng - markerLocation.lng)
        let a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(toRad(markerLocation.lat)) * Math.cos(toRad(markerLocation.lat)) * Math.sin(dlong / 2) * Math.sin(dlong / 2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        let distance = radius * c
        return distance
    }

    // Finds user location and sets the map to the closest studio
    findClosestStudio = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            let markers = this.state.mapMarkers
            if (markers.length > 0) {
                let distances = []
                let closest = -1
    
                markers.forEach((marker, i) => {
                    distances[i] = this.calculateClosest(userLocation, { lat: marker.position.lat(), long: marker.position.lng() })
                    if ( closest === -1 || distances[i] < distances[closest] ) {
                        closest = i
                    }
                })
                this.map.current.map.setCenter({ lat: markers[closest].position.lat(), lng: markers[closest].position.lng() })
                this.map.current.map.setZoom(13)
            }
          },() => {
            alert('Location not found')
          });
        } else {
          alert('Browser does not support Geolocation')
        }
    }

    // Returns Contact Info for Information Window on Map
    getContactInfo = () => {
        let studioName = <h6>{ this.state.selectedStudio.name }</h6>
        let phoneNumber = this.state.selectedStudio.phone ? <p>{ this.state.selectedStudio.phone }</p> : null
        let address = this.state.selectedStudio.address2 ? 
            <p>{ this.state.selectedStudio.address1 }, { this.state.selectedStudio.address2 }</p> :
            <p>{ this.state.selectedStudio.address1 }</p>
        let cityState = <p>{ this.state.selectedStudio.city }, { this.state.selectedStudio.state } { this.state.selectedStudio.zip }</p>
        return (
            <div>
                { studioName }
                { phoneNumber }
                { address }
                { cityState }
            </div>
        )
    }

    render () {
        let mapConfig = this.generateMapConfig()
        
        const studioMarkers = this.props.studios.map(studio => {
            return (
                <Marker
                    ref={ this.onMarkerMounted }
                    id={ studio.id }
                    name={ studio.name }
                    phone={ studio.phone }
                    address1={ studio.street1 }
                    address2={ studio.street2 }
                    city={ studio.city }
                    state={ studio.state }
                    zip={ studio.zip }
                    position={{ lat: studio.latitude, lng: studio.longitude }}
                    key={ studio.id }
                    onClick={ this.onMarkerClick }
                />
            )
        })
   
        return (
            <div>
                <button onClick={ this.findClosestStudio } className="find-studio-btn">Find Nearest Studio</button>
                <Map
                    ref={ this.map }
                    style={ mapConfig.size } 
                    google={this.props.google} zoom={ mapConfig.zoom }
                    initialCenter={ mapConfig.center }
                    onClick={ this.onMapClick }
                >
                    { studioMarkers }
                    <InfoWindow
                        marker={ this.state.activeMarker }
                        visible={ this.state.showMoreInfo }>
                            { this.getContactInfo() }
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GAPI_KEY
})(MapView)