import './Map.scss';
import PropTypes from 'prop-types';
import React from 'react';
import leafletWrapper from 'gibs-map/lib';
let iconRetinaUrl = require('../../assets/images/mountain.png');
let iconUrl = require('../../assets/images/mountain.png');
let shadowUrl = require('../../assets/images/mountain.png');
let L = require('leaflet');

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

iconRetinaUrl = require('../../assets/images/marker-icon-2x.png');
iconUrl = require('../../assets/images/marker-icon.png');
shadowUrl = require('../../assets/images/marker-shadow.png');
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

export default class Map extends React.Component {

	myMap = (new leafletWrapper()).getL(L);

	openEvolution() { }

	buildLayers() {

		const layer1 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			zoom: 0,
			center: [49.009952, 2.548635],
			maxBounds: [[-90.0, -180.0], [90.0, 180.0]],

			transparent: true,
			id: 'mapbox.satellite',
			accessToken: 'pk.eyJ1IjoidHJleHkiLCJhIjoiY2puaGY5aHh5MGRlcjNwcXpkY204cnlnYiJ9.YlB5RoXU8xIZUuAwBdgVFQ'
		});

		var layer2 = new L.GIBSLayer('MODIS_Aqua_SurfaceReflectance_Bands721', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer3 = new L.GIBSLayer('AMSR2_Sea_Ice_Concentration_12km', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer4 = new L.GIBSLayer('MODIS_Terra_Sea_Ice', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer5 = new L.GIBSLayer('MODIS_Aqua_Sea_Ice', {
			date: new Date('2018/04/01'),
			transparent: true
		});
		const layer6 = new L.GIBSLayer('AMSR2_Snow_Water_Equivalent', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		var group = L.layerGroup([layer2]);
		const group2 = L.layerGroup([layer3]);
		const group3 = L.layerGroup([layer4]);
		const group4 = L.layerGroup([layer5]);
		const group5 = L.layerGroup([layer6]);
		// add default layers to map
		this.myMap.addLayer(layer1);

		// switcher
		var baseLayers = {
			'MODIS Aqua SurfaceReflectance Bands': group,
			'AMSR2 Sea Ice Concentration': group2,
			'MODIS Terra Sea Ice': group3,
			'MODIS Aqua Sea Ice': group4,
			'AMSR2 Snow Water Equivalent': group5
			// more layers
		};

		// add layer groups to layer switcher control
		L.control.layers(baseLayers).addTo(this.myMap);
	}
	componentDidMount() {
		this.myMap = L.map('map');
		this.myMap.setView([51.505, -0.09], 13);
		this.buildLayers();
	}

	componentDidUpdate() {
		if (this.props.coordinates) {
			this.myMap.remove();
			this.myMap = L.map('map');
			this.myMap.setView(new L.LatLng(this.props.coordinates[0], this.props.coordinates[1]), 8);
			this.buildLayers();
			L.marker([+this.props.coordinates[0], +this.props.coordinates[1]], { icon: iconStart }).addTo(this.myMap);
			L.circle([this.props.coordinates[0], this.props.coordinates[1]], {
				color: 'blue',
				fillOpacity: 0,
				radius: this.props.radius * 1000
			}).addTo(this.myMap);
			if (this.props.glaciers) {
				this.props.glaciers.forEach(element => {
					let content = L.DomUtil.create('div', 'content');
					content.innerHTML = `<strong>Name:</strong> ${element._source.name || element._source.wgi_glacier_id}<br/><br/><strong>Elevation:</strong> ${element._source.min_elev}mt ~ ${element._source.max_elev}mt<br/><a href=# >View evolution in time</a>`;
					L.DomEvent.addListener(content, 'click', e => {
						this.props.showEvolution(element);
					});
					let popup = L.popup().setContent(content);
					const marker = L.marker([+element._source.location.lat, +element._source.location.lon], { icon: iconDefault }).addTo(this.myMap);
					marker.bindPopup(popup);
				});
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.radius !== nextProps.radius || (!this.props.coordinates && nextProps.coordinates) || !this.props.coordinates || (!this.props.glaciers && nextProps.glaciers) || (this.props.glaciers && this.props.glaciers.length !== nextProps.glaciers.length) || (nextProps.coordinates.toString() !== this.props.coordinates.toString()))
			return true;
		else return false;
	}

	render() {
		return <div id='map' />;
	}
}

Map.propTypes = {
	coordinates: PropTypes.array,
	radius: PropTypes.number,
	glaciers: PropTypes.array,
	showEvolution: PropTypes.func
};