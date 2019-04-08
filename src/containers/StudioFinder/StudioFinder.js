import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../../actions/index'
import axios from 'axios'
import './StudioFinder.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Filter from '../../components/Filter/Filter'
import ListView from '../../components/ListView/ListView'
import MapView from '../../components/MapView/MapView'
import Studios from '../../studios.json'

class StudioFinder extends Component {
    componentDidMount () {
        axios.get('/locations/', {crossdomain: true})
        .then((response) => {
            this.props.setData(response.data.data)
        }).catch(err => {
            console.log(err)
            // fallback incase CORS issue happens
            this.props.setData(Studios.data)
        })
    }

    // Renders the page view based on the state
    getTabContent () {
        if (this.props.view === 'list') {
            return (
                <ListView 
                    studios={ this.props.studios }
                    currentSortField={ this.props.currentSortField }
                    ascending={ this.props.ascending }
                    sortStudios={ this.props.sortStudios }
                    setView={ this.props.setView }
                    setCurrentStudio={ this.props.setCurrentStudio }
                />
            )
        } else {
            return (
                <MapView
                    studios={ this.props.studios }
                    currentStudio={ this.props.currentStudio }
                />
            )
        }
    }

    render () {
        return (
            <Container className="container">
                <Row>
                    <Col><p className="pageTitle"> Studio Finder </p></Col>
                </Row>
                <Row>
                    <Col>
                    <Filter
                        states={ this.props.states }
                        stages={ this.props.stages }
                        filterStudios={ this.props.filterStudios }
                        setStateFilter={ this.props.setStateFilter }
                        setStageFilter={ this.props.setStageFilter }
                        setSearchInput={ this.props.setSearchInput }
                    />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className={'view-btn ' + (this.props.view === 'list' ? 'active-view' : '')} onClick={ () => this.props.setView({ view: 'list' }) }>List</button>
                    </Col>
                    <Col>
                        <button className={'view-btn ' + (this.props.view === 'map' ? 'active-view' : '')} onClick={ () => this.props.setView({ view: 'map' }) }>Map</button>
                    </Col>
                </Row>
                <Row>
                    <Col>{ this.getTabContent() }</Col>
                </Row>
            </Container>
        )
    }
}

// Redux config for Container
const mapStateToProps = state => {
    return {
        studios: state.filteredStudios,
        states: state.states,
        stages: state.stages,
        currentSortField: state.currentSortField,
        ascending: state.ascending,
        view: state.view,
        currentStudio: state.currentStudio
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: payload => dispatch(actions.setData(payload)),
        sortStudios: payload => dispatch(actions.sortStudios(payload)),
        filterStudios: payload => dispatch(actions.filterStudios(payload)),
        setStageFilter: payload => dispatch(actions.setStageFilter(payload)),
        setStateFilter: payload => dispatch(actions.setStateFilter(payload)),
        setSearchInput: payload => dispatch(actions.setSearchInput(payload)),
        setView: payload => dispatch(actions.setView(payload)),
        setCurrentStudio: payload => dispatch(actions.setCurrentStudio(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioFinder)