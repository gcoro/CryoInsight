import React from 'react';
const L = require('leaflet');
const iconRetinaUrl = require('../assets/images/marker-icon-2x.png');
const iconUrl = require('../assets/images/marker-icon.png');
const shadowUrl = require('../assets/images/marker-shadow.png');
const iconDefault = L.icon({
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
			this.props.glaciers.forEach(element => {
				const marker = L.marker([+element._source.location.lat, +element._source.location.lon], { icon: iconDefault }).addTo(this.myMap);
				marker.bindPopup(`<div><strong>Name:</strong> ${element._source.name || element._source.wgi_glacier_id}<br/><br/><strong>Elevation:</strong> ${element._source.min_elev}mt ~ ${element._source.max_elev}mt<br/></div>`);
			});
		}
		if (this.props.coordinates) {
			this.myMap.setView(new L.LatLng(this.props.coordinates[0], this.props.coordinates[1]), 10);
		}
	}

	render() {
		return (<div className='map-container'>
			<div style={{ 'height': 'calc(100vh - 80px)' }} id='mapid'></div>
		</div>);
	} Q
}
