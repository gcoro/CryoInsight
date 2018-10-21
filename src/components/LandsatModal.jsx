import * as React from 'react';
import { Modal } from 'react-bootstrap';

export default class LandsatModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: this.props.show
		};
	}

	render() {
		return (
			<Modal
				show={this.state.show}
				dialogClassName='custom-modal'
				bsSize='lg'
				onHide={() => this.props.handleOpenLandsatModal('close')}
				style={{
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: '1002',
					backgroundColor: 'white',
					maxHeight: '30em',
					width: '70%',
					overflow: 'scroll',
					overflowX: 'hidden',
					paddingRight: '30px',
					paddingLeft: '30px',
					boxShadow: '10px 5px 20px 6px #0000007a',
					height: '60%',
					borderRadius: '2em',
					outline: 'none'
				}}
			>
				<Modal.Header closeButton style={{ float: 'right', marginBottom: '10px' }} />
				<Modal.Body style={{ clear: 'both' }}>
					{this.props.landsatImagesUrls.map(e =>
                        <img src={e.url}/>
                    )}
				</Modal.Body>
			</Modal>
		);
	}
}