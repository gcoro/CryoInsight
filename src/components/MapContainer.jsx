import React from 'react';
let L = require('leaflet');
let iconRetinaUrl = require('../assets/images/mountain.png');
let iconUrl = require('../assets/images/mountain.png');
let shadowUrl = require('../assets/images/mountain.png');
const iconDefault = L.icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [41, 35],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});

iconRetinaUrl = require('../assets/images/marker-icon-2x.png');
iconUrl = require('../assets/images/marker-icon.png');
shadowUrl = require('../assets/images/marker-shadow.png');
const iconStart = L.icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});

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
		if (this.props.glaciers) {
			this.myMap.remove();
			L = require('leaflet');
			this.myMap = L.map('mapid');
			this.myMap.setView(new L.LatLng(this.props.coordinates[0], this.props.coordinates[1]), 10);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.satellite',
				accessToken: 'pk.eyJ1IjoidHJleHkiLCJhIjoiY2puaGY5aHh5MGRlcjNwcXpkY204cnlnYiJ9.YlB5RoXU8xIZUuAwBdgVFQ'
			}).addTo(this.myMap);
			this.props.glaciers.forEach(element => {
				const marker = L.marker([+element._source.location.lat, +element._source.location.lon], { icon: iconDefault }).addTo(this.myMap);
				marker.bindPopup(`<div><strong>Name:</strong> ${element._source.name || element._source.wgi_glacier_id}<br/><br/><strong>Elevation:</strong> ${element._source.min_elev}mt ~ ${element._source.max_elev}mt<br/></div>`);
			});
		}
		if (this.props.coordinates) {
			L.marker([+this.props.coordinates[0], +this.props.coordinates[1]], { icon: iconStart }).addTo(this.myMap);
			L.circle([this.props.coordinates[0], this.props.coordinates[1]], {
				color: 'blue',
				fillOpacity: 0,
				radius: 100000
			}).addTo(this.myMap);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.coordinates && this.props.coordinates) {
			if ((nextProps.coordinates).toString() === (this.props.coordinates).toString())
				return false
			else return true;
		}
		else return true;
	}

	render() {
		return (<div className='map-container' id="map-container">
			<div style={{ 'height': 'calc(100vh - 80px)' }} id='mapid'></div>
		</div>);
	} Q
}
