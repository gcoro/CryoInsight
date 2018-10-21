import React from 'react';

export default class Drawer extends React.Component {
	render() {
		return (<div id='sidebar' style={{
			position: 'absolute', zIndex: '1001', width: '30vh', height: 'calc(100vh - 80px)',
			background: 'dodgerblue', display: 'flex', flexDirection: 'column'
		}}>
			<button onClick={() => this.props.handleOpenModal('open')}
				style={{
					width: 'fit-content', marginLeft: 'auto', marginRight: 'auto', marginTop: '2em',
					background: 'transparent', border: 'none', fontSize: '1em', color: '#e1f0ff', cursor: 'pointer',
					outline: 'none'
				}}
			>About the cryosphere</button>
			<p style={{ textAlign: 'center' }}>Drawer field example</p>
		</div>);
	}
}