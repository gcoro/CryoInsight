import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import MapContainer from './components/MapContainer';
import InfoModal from './components/InfoModal';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerIsOpen: false,
      modalIsOpen: false,
      city: undefined
    }
  }

  handleOpenDrawer() {
    if (this.state.drawerIsOpen) this.setState({ drawerIsOpen: false });
    else this.setState({ drawerIsOpen: true });
  }

  handleOpenModal(action) {
    if (action === 'close') this.setState({ modalIsOpen: false });
    else this.setState({ modalIsOpen: true });
  }

  handleInputChange({ target }) {
    this.setState({ city: target.value });
    console.log(this.state.city);
  }

  async handleSearch() {
    const response = await axios.get(`http://dev.virtualearth.net/REST/v1/Locations?locality=${this.state.city}&key=Atn87LNT3ti0O7t2_xkALsJ3XcpZs8oCEP0C1Ppj3j13GBNEqtEaeWXteOkTf9rI`)
    console.log(response);
  }

  render() {
    return (<>
      <Header handleOpenDrawer={this.handleOpenDrawer.bind(this)} drawerIsOpen={this.state.drawerIsOpen}
        handleInputChange={this.handleInputChange.bind(this)} handleSearch={this.handleSearch.bind(this)} />
      {this.state.drawerIsOpen && <Drawer handleOpenModal={this.handleOpenModal.bind(this)} />}
      <MapContainer />
      {this.state.modalIsOpen && <InfoModal show={true} handleOpenModal={this.handleOpenModal.bind(this)} />}
    </>
    );
  }
}

export default App;
