import * as React from 'react';
import { Modal } from 'react-bootstrap';

export default class InfoModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: this.props.show
		};
	}

	render() {
		return (
			<>
				<Modal
					{...this.props}
					show={this.state.show}
					dialogClassName='custom-modal'
					bsSize='lg'
					style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						zIndex: '1002',
						backgroundColor: 'white'
					}}
				>
					<Modal.Header closeButton />
					<Modal.Body>
						<div>Modal content</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}