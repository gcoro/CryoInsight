import React from 'react';
const L = require('leaflet');

// pure component is used to avoid unnecessary updates
export default class MapContainer extends React.Component {

	myMap;

	componentDidMount() {
		this.myMap = L.map('mapid');
		this.myMap.setView([51.505, -0.09], 13);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.satellite',
			accessToken: 'pk.eyJ1IjoidHJleHkiLCJhIjoiY2puaGY5aHh5MGRlcjNwcXpkY204cnlnYiJ9.YlB5RoXU8xIZUuAwBdgVFQ'
		}).addTo(this.myMap);
	}

	componentDidUpdate() {
		if (this.props.coordinates) {
			this.myMap.setView(new L.LatLng(this.props.coordinates[0], this.props.coordinates[1]), 100);
		}
		if(this.props.glaciers) {
			this.props.glaciers.forEach(element => {
				const marker = L.marker([element._source.location.lat, element._source.location.lon]).addTo(this.myMap);
				marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		/*if ((!this.props.coordinates && nextProps.coordinates) || (!this.props.glaciers && nextProps.glaciers)) return true;
		else if (!this.props.coordinates && !nextProps.coordinates) return false;
		else return true;*/
		return true;
	}

	render() {
		return (<div className='map-container'>
			<div style={{ 'height': 'calc(100vh - 80px)' }} id='mapid'></div>
		</div>);
	} Q
}
