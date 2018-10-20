import React from 'react';

export default class Drawer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div style={{
			position: 'absolute', zIndex: '1001', width: '30vh', height: 'calc(100vh - 80px)',
			background: 'dodgerblue'
		}}>
			<button onClick={() => this.props.handleOpenModal('open')}>Open information</button>
			<p>Drawer field example</p>
		</div>);
	}
}