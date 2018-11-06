import './RadiusSlider.scss';
import PropTypes from 'prop-types';
import React from 'react';

export default class RadiusSlider extends React.Component {
	render() {
		return <>
			<div className='radius-slider-container'>
				<input type='range' min='100' max='200' step='20'
					className='radius-slider'
					onChange={(e) => this.props.changeRadius(e)} />
				<span>{this.props.radius + ' Km'}</span>
			</div>
		</>;
	}
}

RadiusSlider.propTypes = {
	radius: PropTypes.number.isRequired,
	changeRadius: PropTypes.func.isRequired
};