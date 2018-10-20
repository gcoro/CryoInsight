import React from 'react';
const logo = require('../assets/images/logo.svg');

export default class Header extends React.Component {

	onKeyUpHandler(event) {
		const code = event.which || event.keyCode;
		if (code === 13) this.props.handleSearch();
	}

	toggleDistrict(e, action) {
		if (action === 'show') document.getElementById('input-district').style.display = 'block';
		else document.getElementById('input-district').style.display = 'none';
	}

	render() {
		return <>
			<div className='header' style={{
				background: 'dodgerblue', height: '80px',
				display: 'flex', justifyContent: 'space-between', alignItems: 'center'
			}}>
				<button onClick={this.props.handleOpenDrawer} style={{
					color: 'white', background: 'none',
					border: 'none', outline: 'none', fontSize: '30px', paddingLeft: '10px'
				}}>
					{(this.props.drawerIsOpen && <i className="fas fa-chevron-circle-down"></i>) ||
						<i className="fas fa-chevron-circle-right"></i>}
				</button>
				<div id='title' style={{ display: 'flex', flexDirection: 'row' }}>
					<img alt='logo' src={logo}></img>
					<p style={{
						fontFamily: '\'Niramit\', sans-serif', color: 'white',
						fontWeight: 'bold', fontSize: '30px', marginTop: '50px', marginLeft: '10px'
					}}>Cryoinsight</p>
				</div>
				<div id='search-bar' style={{ height: '120px' }}>
					<div >
						<input id='input-location' name='city' onKeyDown={(e) => this.onKeyUpHandler(e)} style={{
							height: '35px', marginRight: '10px', marginTop: '40px',
							paddingRight: '30px', paddingLeft: '5px'
						}} placeholder='City' onChange={this.props.handleInputChange}
							onFocus={(e) => this.toggleDistrict(e, 'show')} />
						<i className="fas fa-search" style={{ position: 'relative', right: '35px', cursor: 'pointer' }}
							onClick={this.props.handleSearch} />
					</div>
					<input id='input-district' name='adminDistrict' placeholder='District' hidden={true} style={{
						position: 'relative', top: '10px',
						height: '35px', marginRight: '10px',
						paddingRight: '30px', paddingLeft: '5px', zIndex: '1003'
					}} onBlur={(e) => this.toggleDistrict(e, 'hide')}
						onChange={this.props.handleInputChange}></input>
				</div>
			</div>
		</>;
	}

}
