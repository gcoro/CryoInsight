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
      coordinates: undefined,
      userLocation:undefined,
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
    if (response.data.resourceSets[0].resources[0]) {
      this.setState({
        coordinates: response.data.resourceSets[0].resources[0].point.coordinates
      });
    }
    const payload = {
      distance: '100km',
      latitude: this.state.coordinates[0],
      longitude: this.state.coordinates[1]
    }
    const glaciers = await axios.post('http://10.0.1.200:4000/search', payload);
    console.log(glaciers);
  }

  findMyLocation(){
      console.log("i'm finding your location..")
      if(!navigator || !navigator.geolocation) return;
      let f = pos => {
        console.log(pos)
        this.setState({userLocation:{
            accuracy:pos.coords.accuracy,
            latitude:pos.coords.latitude,
            longitude:pos.coords.longitude
        }})
      }
      
      let e = function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(f,e)
  }

  render() {
    return (<>
      <Header handleOpenDrawer={this.handleOpenDrawer.bind(this)} drawerIsOpen={this.state.drawerIsOpen}
        handleInputChange={this.handleInputChange.bind(this)} handleSearch={this.handleSearch.bind(this)} 
        findMyLocation={this.findMyLocation.bind(this)}/>
      {this.state.drawerIsOpen && <Drawer handleOpenModal={this.handleOpenModal.bind(this)} />}
      <MapContainer coordinates={this.state.coordinates} />
      {this.state.infoModalIsOpen && <InfoModal show={true} handleOpenModal={this.handleOpenModal.bind(this)} />}
    </>
    );
  }
}

export default App;
