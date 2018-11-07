import './App.scss';
import Header from './components/Header/Header';
import LandsatModal from './components/LandsatModal/LandsatModal';
import Loader from './components/Loader/Loader';
import Map from './components/Map/Map';
import RadiusSlider from './components/RadiusSlider/RadiusSlider';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			city: undefined,
			adminDistrict: undefined,
			coordinates: undefined,
			glaciers: undefined,
			landsatImages: undefined,
			landsatModalIsOpen: false,
			radius: 100,
			isLoading: false,
			showRadiusSlider: false
		};
	}

	handleOpenLandsatModal(action) {
		if (action === 'close') this.setState({ landsatModalIsOpen: false });
		else this.setState({ landsatModalIsOpen: true });
	}

	handleInputChange({ target }) {
		this.setState({ [target.name]: target.value });
	}

	async handleSearch() {
		try {
			const response = await axios.get(`http://dev.virtualearth.net/REST/v1/
			Locations?locality=${this.state.city}&adminDistrict=${this.state.adminDistrict || ''}
			&key=Atn87LNT3ti0O7t2_xkALsJ3XcpZs8oCEP0C1Ppj3j13GBNEqtEaeWXteOkTf9rI`);
			// in console.log are ALL the matching resulting cities, we will only use the first one
			console.log(response.data.resourceSets[0].resources);
			if (response.data.resourceSets[0].resources[0]) {
				this.setState({
					coordinates: response.data.resourceSets[0].resources[0].point.coordinates,
					showRadiusSlider: true
				});
				const payload = {
					distance: (this.state.radius) + 'km',
					latitude: this.state.coordinates[0],
					longitude: this.state.coordinates[1]
				};
				this.findGlaciers(payload);
			}
		}
		catch (err) {
			console.error('An error occurred while trying to identify the location specified.');
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
				distance: (this.state.radius) + 'km',
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			};
			this.findGlaciers(payload);
		};
		let e = function error(err) {
			console.error('An error occurred while trying to get your position.');
		};
		navigator.geolocation.getCurrentPosition(f, e);
	}

	async findGlaciers(payload) {
		try {
			const glaciers = await axios.post('http://localhost:4000/search', payload);
			this.setState({
				glaciers: glaciers.data.hits.hits
			});
		}
		catch (err) {
			console.error('An error occurred while retrieving glaciers data from the backend.');
		}
	}

	async showEvolution(e) {
		let coord = e._source.location;
		let landsatImages = [];
		this.setState({ landsatImages, landsatModalIsOpen: true, isLoading: true });
		try {
			for (let i = 1; i <= 5; ++i) {
				let a = await axios.get(`https://api.nasa.gov/planetary/earth/imagery
				?lon=${coord.lon}&lat=${coord.lat}&date=${2018 - i}-05-01
				&dim=0.1&api_key=mV82IUCJV38NkPI9lOMvAEGOLD6Q8btvkFjGJf3S`);
				landsatImages.push(a.data);
			}
			this.setState({ landsatImages, isLoading: false });
		}
		catch (err) {
			console.error(err);
		}
	}

	changeRadius(e) {
		this.setState({ radius: +e.target.value });
		this.handleSearch();
	}

	render() {
		return (
			<>{this.state.isLoading && <Loader />}
				<Header
					handleInputChange={this.handleInputChange.bind(this)} handleSearch={this.handleSearch.bind(this)}
					findMyLocation={this.findMyLocation.bind(this)} />
				{this.state.landsatModalIsOpen && this.state.landsatImages && <LandsatModal show={true} landsatImages={this.state.landsatImages}
					handleOpenLandsatModal={this.handleOpenLandsatModal.bind(this)} />}
				<Map radius={this.state.radius} coordinates={this.state.coordinates} glaciers={this.state.glaciers} showEvolution={this.showEvolution.bind(this)} />
				{this.state.showRadiusSlider && <RadiusSlider radius={this.state.radius} changeRadius={this.changeRadius.bind(this)} />}
			</>
		);
	}
}

export default App;
