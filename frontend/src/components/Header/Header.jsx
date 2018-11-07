import './Header.scss';
import PropTypes from 'prop-types';
import React from 'react';

export default class Header extends React.Component {

	onKeyDownHandler(event) {
		const code = event.which || event.keyCode;
		if (code === 13) this.props.handleSearch();
	}

	render() {
		return (
			<div className='header'>
				<div className='title-container'>
					<p className='title'>CryoInsight</p>
					<p className='subtitle'>Discover the cryosphere</p>
				</div>
				<div className='header-elements'>
					<i className='fas fa-map-marker-alt my-location'
						onClick={this.props.findMyLocation} />
					<input id='input-location'
						name='city'
						placeholder='City'
						onChange={this.props.handleInputChange}
						onKeyDown={(e) => this.onKeyDownHandler(e)}
					/>
					<input id='input-district'
						name='adminDistrict'
						placeholder='District'
						onChange={this.props.handleInputChange}
						onKeyDown={(e) => this.onKeyDownHandler(e)}
					/>
					<i className='fas fa-search search'
						onClick={this.props.handleSearch} />
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	handleSearch: PropTypes.func,
	findMyLocation: PropTypes.func,
	handleInputChange: PropTypes.func
};