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
      glaciers: undefined,
      LandsatImagesUrls:undefined,
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
      const payload = {
        distance: '100km',
        latitude: this.state.coordinates[0],
        longitude: this.state.coordinates[1]
      }
      this.findGlaciers(payload);
    }
  }

  findMyLocation() {
    if (!navigator || !navigator.geolocation) return;
    let f = pos => {
      this.setState({
        coordinates: [
          pos.coords.latitude,
          pos.coords.longitude
        ]
      });
      const payload = {
        distance: '100km',
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      this.findGlaciers(payload);
    }
    let e = function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(f, e);
  }

  async findGlaciers(payload) {
    const glaciers = await axios.post('http://10.0.1.200:4000/search', payload);
    console.log(glaciers.data.hits.hits);
    this.setState({
      glaciers: glaciers.data.hits.hits
    });
  }
  async showEvolution(e){
      let coord = e._source.location;
      let LandsatImagesUrls = [];
      try{
      for(let i = 1; i<=5; ++i){
        let a = await axios.get(`https://api.nasa.gov/planetary/earth/imagery?lon=${coord.lon}&lat=${coord.lat}&date=${2018-i}-05-01&dim=0.1&api_key=mV82IUCJV38NkPI9lOMvAEGOLD6Q8btvkFjGJf3S`)
        LandsatImagesUrls.push(a.data)
      }
      this.setState({LandsatImagesUrls})
    }
    catch(err) {
        console.log(err)
    }
  }

  render() {
    return (<>
      <Header handleOpenDrawer={this.handleOpenDrawer.bind(this)} drawerIsOpen={this.state.drawerIsOpen}
        handleInputChange={this.handleInputChange.bind(this)} handleSearch={this.handleSearch.bind(this)}
        findMyLocation={this.findMyLocation.bind(this)} />
      {this.state.drawerIsOpen && <Drawer handleOpenModal={this.handleOpenModal.bind(this)} />}
      {this.state.LandsatImagesUrls && alert("url recuperati")}
      <MapContainer coordinates={this.state.coordinates} glaciers={this.state.glaciers} showEvolution={this.showEvolution.bind(this)}/>
      {this.state.infoModalIsOpen && <InfoModal show={true} handleOpenModal={this.handleOpenModal.bind(this)} />}
    </>
    );
  }
}

export default App;
