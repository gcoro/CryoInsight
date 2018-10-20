import React from 'react';

export default class Header extends React.Component {
	render() {
		return (<div className='header' style={{
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
			<p style={{
				fontFamily: '\'Niramit\', sans-serif', color: 'white',
				fontWeight: 'bold', fontSize: '30px'
			}}>Cryoinsight</p>
			<div id='search-bar'>
				<input id='input-location' style={{
					height: '35px', marginRight: '10px',
					paddingRight: '30px', paddingLeft: '5px'
				}} />
				<i className="fas fa-search" style={{ position: 'relative', right: '35px' }} />
			</div>
		</div>);
	}
}
