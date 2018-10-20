import React from 'react';

export default class Header extends React.Component {
	render() {
		return (<div className='header' style={{background: 'dodgerblue', height: '80px'}}>
			<button onClick={this.props.handleOpenDrawer}>Toggle toolbar</button>Cryoinsight 
		</div>);
	}
}
