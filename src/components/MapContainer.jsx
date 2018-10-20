import React from 'react';
var L = require('leaflet');

export default class MapContainer extends React.Component {
	render() {
		return (<div className='map-container'>
			<div style={{ 'height': 'calc(100vh - 80px)' }} id='mapid'></div>
		</div>);
	}
	componentDidMount(){
		var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'pk.eyJ1IjoidHJleHkiLCJhIjoiY2puaGY5aHh5MGRlcjNwcXpkY204cnlnYiJ9.YlB5RoXU8xIZUuAwBdgVFQ'
}).addTo(mymap);
	}
}
