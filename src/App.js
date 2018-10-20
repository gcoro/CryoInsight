import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import MapContainer from './components/MapContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerIsOpen: false
    }
  }

  handleOpenDrawer() {
    if(this.state.drawerIsOpen) this.setState({drawerIsOpen: false});
    else this.setState({drawerIsOpen: true});
  }

  render() {
    return (<>
      <Header handleOpenDrawer={this.handleOpenDrawer.bind(this)} drawerIsOpen={this.state.drawerIsOpen} />
      {this.state.drawerIsOpen && <Drawer />}
      <MapContainer />
    </>
    );
  }
}

export default App;
