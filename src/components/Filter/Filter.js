import React, { Component } from 'react';
import './Filter.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Filter extends Component {
    // Manages stage dropdown change
    stageChangeHandler = (e) => {
        this.props.setStageFilter({stageFilter: e.target.value})
    }

    // Manages state dropdown change
    stateChangeHandler = (e) => {
        this.props.setStateFilter({stateFilter: e.target.value})
    }

    // Manages search input change
    setSearchInput = (e) => {
        this.props.setSearchInput({searchInput: e.target.value})
    }

    render () {
        let stages = <select className="dropdown" onChange={this.stageChangeHandler}>
            <option key="stage" value="">Stage</option>
            {
                this.props.stages.map(stage => {
                    return <option key={stage} value={stage}>{stage}</option>
                })
            }
        </select>

        let states = <select className="dropdown" onChange={this.stateChangeHandler}>
            <option key="state" value="">State</option>
            {
                this.props.states.map(state => {
                    return <option key={state} value={state}>{state}</option>
                })
            }
            </select>

        return (
            <Container className="filter-container">
                <Row>
                <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                    {stages}
                </Col>
                <Col xl={3} lg={3} md={3} sm={6} xs={6}>
                    {states}
                </Col>
                <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                    <input className="search-input" onChange={this.setSearchInput} type="text" placeholder={this.props.searchInput || 'Studio Name'}/>
                </Col>
                <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                    <button className="filter-btn" onClick={this.props.filterStudios}>Filter</button>
                </Col>
                </Row>
            </Container>
        )
    }
}

export default Filter