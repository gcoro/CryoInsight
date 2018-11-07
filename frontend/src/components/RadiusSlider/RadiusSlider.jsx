import './RadiusSlider.scss';
import PropTypes from 'prop-types';
import React from 'react';

const RadiusSlider = (props) => (
	<div className='radius-slider-container'>
		<input type='range' min='100' max='200' step='10'
			className='radius-slider'
			onChange={(e) => props.changeRadius(e)} />
		<span>{props.radius + ' Km'}</span>
	</div>
);

RadiusSlider.propTypes = {
	radius: PropTypes.number.isRequired,
	changeRadius: PropTypes.func.isRequired
};

export default RadiusSlider;