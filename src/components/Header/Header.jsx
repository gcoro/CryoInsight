import PropTypes from 'prop-types';
import React from 'react';

export default class Header extends React.Component {

	onKeyDownHandler(event) {
		const code = event.which || event.keyCode;
		if (code === 13) this.props.handleSearch();
	}

	render() {
		return <>
			<div className='header' style={{
				background: 'white', height: '5em',
				display: 'flex', justifyContent: 'space-between', alignItems: 'center'
			}}>
				<div id='title' style={{ paddingLeft: '10px' }}>
					<p style={{
						fontFamily: '\'Roboto Mono\', monospace', color: 'black',
						fontWeight: 'bold', fontSize: '2em', margin: '0'
					}}>CryoInsight</p>
					<p style={{
						fontFamily: '\'Roboto Mono\', monospace', color: 'black',
						fontWeight: 'thin', fontSize: '0.8em', margin: '0', padding: '2px'
					}}>Discover the cryosphere</p>
				</div>
				<div style={{
					display: 'flex', alignItems: 'center', paddingLeft: '10px',
					flexDirection: 'row'
				}}>
					<i className='fas fa-map-marker-alt'
						onClick={this.props.findMyLocation}
						style={{
							fontSize: '1.5em', marginRight: '1em',
							cursor: 'pointer', color: 'black'
						}} />
					<input id='input-location' name='city'
						placeholder='City'
						style={{
							height: '1.5em', padding: '0.5em',
							marginRight: '0.3em', width: '12em'
						}}
						onChange={this.props.handleInputChange}
						onKeyDown={(e) => this.onKeyDownHandler(e)}
					/>
					<input id='input-district' name='adminDistrict'
						placeholder='District'
						style={{
							height: '1.5em', padding: '0.5em',
							width: '13.6em'
						}}
						onChange={this.props.handleInputChange}
						onKeyDown={(e) => this.onKeyDownHandler(e)}
					/>
					<i className='fas fa-search'
						style={{ position: 'relative', right: '1.6em', cursor: 'pointer' }}
						onClick={this.props.handleSearch} />
				</div>
			</div>
		</>;
	}

}

Header.propTypes = {
	handleSearch: PropTypes.func,
	findMyLocation: PropTypes.func,
	handleInputChange: PropTypes.func
};