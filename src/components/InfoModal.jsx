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
				<Modal
					show={this.state.show}
					dialogClassName='custom-modal'
					bsSize='lg'
					onHide={() => this.props.handleOpenModal('close')}
					style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						zIndex: '1002',
                        backgroundColor: 'white',
                        maxHeight:'30em',
                        width:'35em',
                        overflow:'scroll',
                        overflowX:'hidden',
                        padding:'30px',
                        paddingLeft:'30px',
                        boxShadow:'10px 5px 20px 6px #0000007a'
					}}
				>
					<Modal.Header closeButton style={{float:'right',marginBottom:'10px'}}/>
					<Modal.Body style={{clear:'both'}}>
						<div><p>The cryosphere is made up of every body of water that 
							is frozen. It makes up 2.1% of Earths water reservoirs 
							and it contains 75% of the worlds freshwater. In its 
							maximum extension the cryosphere influences a
							totality of 68 million km&#178;. In its natural 
							state the cryosphere is mainly static being that 
							there aren’t substantial 
							influxes and outflows of material during our epoch.</p>
							<p>The extension of the cryosphere determines the varying of a multitude of factors the most notable being the increment or decrease of temperature. Our Earth is affected by a temperature cycle that lasts several hundred thousand years in which the atmosphere varies between +4°C and -9°C. We are currently on the peak of one of the graphs crests at around 4 degrees Celsius which means the cryosphere is at its minimum extension and there shouldn’t be much material gain nor loss.</p>
							<p>Unfortunately the current human activity has increased the velocity with which the ice caps are melting so rather than being in their normal static state they are melting at a really worrying rate. In the 1800 there were only 270 CO2 parts per million (ppm) while in 2018 we have arrived at an all-time high of 420 ppm.</p>
							<p>In 2015 the most important heads of state united in a council in Paris to discuss this impending menace and decided that the increase in global temperature had to be less than 2°C. This threshold was set because 2 degrees is the limit over which the effects on the planet would be too great to reverse. Surpassing this limit would imply that the cryosphere would melt releasing the gasses contained in it and cause a chain reaction that would generate even more heat.</p>
							<p>Our objective is to highlight the effects of such variation that may seem inconspicuous but in reality may determine the existence of many famous cities and the health and well-being of millions of people.</p>
							</div>
					</Modal.Body>
				</Modal>
		);
	}
}