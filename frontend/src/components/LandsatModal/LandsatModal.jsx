import './LandsatModal.scss';
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
				dialogClassName='landsat-modal'
				bsSize='lg'
				onHide={() => this.props.handleOpenLandsatModal('close')}
			>
				<Modal.Header closeButton />
				<Modal.Body >
					{this.props.landsatImages.map((item, key) =>
						<div className='landsat-item' key={key} >
							<img src={item.url} alt='glacier landsat pic' />
							<p>{item.date.split('T')[0]}</p>
						</div>
					)}
				</Modal.Body>
			</Modal>
		);
	}
}

LandsatModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleOpenLandsatModal: PropTypes.func.isRequired,
	landsatImages: PropTypes.array.isRequired
};