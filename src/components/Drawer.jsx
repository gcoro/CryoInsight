import React from 'react';

export default class Drawer extends React.Component {
	render() {
		return (<div style={{
			position: 'absolute', zIndex: '1001', width: '30vh', height: 'calc(100vh - 80px)',
			background: 'dodgerblue'
		}}>

			<p>Drawer field</p>
		</div>);
	}
}