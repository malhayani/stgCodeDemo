import React, { Component } from 'react'
import './App.css';
import StudioFinder from './containers/StudioFinder/StudioFinder'

class App extends Component {
  render() {
    const studioName = 'Shred415'
    
    return (
      <div className="App">
        <header className="header">
            <p>{ studioName }</p>
        </header>
        <StudioFinder/>
      </div>
    );
  }
}

export default App;
