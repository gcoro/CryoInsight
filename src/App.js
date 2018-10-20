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
      infoModalIsOpen: false,
      city: undefined,
      adminDistrict: undefined,
      targetCoordinates: undefined
    }
  }

  handleOpenDrawer() {
    if (this.state.drawerIsOpen) this.setState({ drawerIsOpen: false });
    else this.setState({ drawerIsOpen: true });
  }

  handleOpenModal(action) {
    if (action === 'close') this.setState({ infoModalIsOpen: false });
    else this.setState({ infoModalIsOpen: true });
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleSearch() {
    const response = await axios.get(`http://dev.virtualearth.net/REST/v1/Locations?locality=${this.state.city}&adminDistrict=${this.state.adminDistrict || ''}&key=Atn87LNT3ti0O7t2_xkALsJ3XcpZs8oCEP0C1Ppj3j13GBNEqtEaeWXteOkTf9rI`)
    console.log(response.data.resourceSets[0].resources); // this are ALL the matching resulting cities
    this.setState({
      targetCoordinates: response.data.resourceSets[0].resources[0].point.coordinates
    });
  }

  findMyLocation(){
      console.log("im finding your location..")
  }

  render() {
    return (<>
      <Header handleOpenDrawer={this.handleOpenDrawer.bind(this)} drawerIsOpen={this.state.drawerIsOpen}
        handleInputChange={this.handleInputChange.bind(this)} handleSearch={this.handleSearch.bind(this)} 
        findMyLocation={this.findMyLocation.bind(this)}/>
      {this.state.drawerIsOpen && <Drawer handleOpenModal={this.handleOpenModal.bind(this)} />}
      <MapContainer />
      {this.state.infoModalIsOpen && <InfoModal show={true} handleOpenModal={this.handleOpenModal.bind(this)} />}
    </>
    );
  }
}

export default App;
