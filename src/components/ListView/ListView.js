import React, { Component } from 'react';
import './ListView.css'
import { faCaretDown, faCaretUp, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListView extends Component {
    // Generates caret icon for sorting based on state
    getIcon = (field) => {
        if (field === this.props.currentSortField && this.props.ascending) {
            return <FontAwesomeIcon icon={ faCaretUp }/>
        } else {
            return <FontAwesomeIcon icon={ faCaretDown }/>
        }
    } 

    // Manages map icon onClick - sets current studio and routes user to map view
    onMapClickHandler = (studio) => {
        this.props.setView({ view: 'map' })
        this.props.setCurrentStudio({ studio: studio })
    }

    render () {
        const studioList = this.props.studios.map(studio => {
            return (
                <tr key={ studio.id }>
                    <td>{ studio.name }</td>
                    <td>{ studio.stage }</td>
                    <td>{ studio.city }</td>
                    <td>{ studio.state }</td>
                    <td className="icon-column" onClick={ () => this.onMapClickHandler(studio) }>
                        <FontAwesomeIcon icon={ faMapMarkedAlt }/>
                    </td>
                </tr>
            )
        })

        return (
            <table className="list-table">
                <thead>
                    <tr>
                        <th onClick={ () => this.props.sortStudios('name') }>{ this.getIcon('name') } Studio Name</th>
                        <th onClick={ () => this.props.sortStudios('stage') }>{ this.getIcon('stage') } Stage</th>
                        <th onClick={ () => this.props.sortStudios('city') }>{ this.getIcon('city') } City</th>
                        <th onClick={ () => this.props.sortStudios('state') }>{ this.getIcon('state') } State</th>
                        <th className="icon-column-header">Map View</th>
                    </tr>
                </thead>
                <tbody>
                    { studioList }
                </tbody>
            </table>
        )
    }
}

export default ListView