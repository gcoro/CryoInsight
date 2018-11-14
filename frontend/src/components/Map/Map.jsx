import './Map.scss';
import { Icon, glacierMarker, positionMarker } from '../../utils/constants';
import L from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import GIBSLeaflet from 'gibs-leaflet';

const glacierIcon = new Icon({ iconUrl: glacierMarker, iconSize: [41, 35] }),
	positionIcon = new Icon({ iconUrl: positionMarker });

export default class Map extends React.Component {

	map = GIBSLeaflet.wrap(L);

	buildLayers() {

		// defining the base layer
		const baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			zoom: 0,
			center: [49.009952, 2.548635],
			maxBounds: [[-90.0, -180.0], [90.0, 180.0]],
			transparent: true,
			id: 'mapbox.satellite',
			accessToken: 'pk.eyJ1IjoidHJleHkiLCJhIjoiY2puaGY5aHh5MGRlcjNwcXpkY204cnlnYiJ9.YlB5RoXU8xIZUuAwBdgVFQ'
		});

		// adding the base layer to map
		this.map.addLayer(baseLayer);

		// define additional layers
		const layer1 = new L.GIBSLayer('GMI_Snow_Rate_Asc', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer2 = new L.GIBSLayer('AMSR2_Sea_Ice_Concentration_12km', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer3 = new L.GIBSLayer('MODIS_Terra_Sea_Ice', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer4 = new L.GIBSLayer('MODIS_Aqua_Sea_Ice', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer5 = new L.GIBSLayer('AMSR2_Snow_Water_Equivalent', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		const layer6 = new L.GIBSLayer('MODIS_Aqua_SurfaceReflectance_Bands721', {
			date: new Date('2018/04/01'),
			transparent: true
		});

		// layer groups
		const group1 = L.layerGroup([layer1]);
		const group2 = L.layerGroup([layer2]);
		const group3 = L.layerGroup([layer3]);
		const group4 = L.layerGroup([layer4]);
		const group5 = L.layerGroup([layer5]);
		const group6 = L.layerGroup([layer6]);

		// switcher
		const baseLayers = {
			'GMI Snow Rate Asc': group1,
			'AMSR2 Sea Ice Concentration': group2,
			'MODIS Terra Sea Ice': group3,
			'MODIS Aqua Sea Ice': group4,
			'AMSR2 Snow Water Equivalent': group5,
			'MODIS Aqua SurfaceReflectance Bands': group6
			// more layers
		};

		// add layer groups to layer switcher control
		L.control.layers(baseLayers).addTo(this.map);
	}

	componentDidMount() {
		this.map = L.map('map');
		this.map.setView([51.505, -0.09], 13);
		this.buildLayers();
	}

	componentDidUpdate() {
		if (this.props.coordinates) {
			this.map.eachLayer((layer) => {
				this.map.removeLayer(layer);
			});
			this.map.remove();
			this.map = L.map('map');
			this.map.setView(new L.LatLng(this.props.coordinates[0], this.props.coordinates[1]), 8);
			this.buildLayers();
			L.marker([+this.props.coordinates[0], +this.props.coordinates[1]], { icon: positionIcon }).addTo(this.map);
			L.circle([this.props.coordinates[0], this.props.coordinates[1]], {
				color: 'white',
				fillOpacity: 0.1,
				radius: this.props.radius * 1000
			}).addTo(this.map);
			if (this.props.glaciers) {
				this.props.glaciers.forEach(element => {
					let content = L.DomUtil.create('div', 'content');
					content.innerHTML = `<strong>Name:</strong> ${element._source.name || element._source.wgi_glacier_id}<br/><br/><strong>Elevation:</strong> ${element._source.min_elev}mt ~ ${element._source.max_elev}mt<br/><a href=# >View evolution in time</a>`;
					L.DomEvent.addListener(content, 'click', e => {
						this.props.showEvolution(element);
					});
					let popup = L.popup().setContent(content);
					const marker = L.marker([+element._source.location.lat, +element._source.location.lon], { icon: glacierIcon }).addTo(this.map);
					marker.bindPopup(popup);
				});
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.radius !== nextProps.radius ||
			(!this.props.coordinates && nextProps.coordinates) ||
			!this.props.coordinates ||
			(!this.props.glaciers && nextProps.glaciers) ||
			(this.props.glaciers && this.props.glaciers.length !== nextProps.glaciers.length)
			|| (nextProps.coordinates.toString() !== this.props.coordinates.toString()))
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
