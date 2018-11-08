
import L from 'leaflet';

// images
export const markerShadow = require('../assets/images/marker-shadow.png');
export const glacierMarker = require('../assets/images/mountain.png');
export const positionMarker = require('../assets/images/marker-icon.png');

// custom icons constructor
export const Icon = L.Icon.extend({
	options: {
		shadowUrl: 'marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [41, 41]
	}
});