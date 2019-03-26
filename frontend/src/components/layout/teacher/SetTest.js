import React, { Component } from 'react';
import { ButtonToolbar,Button } from "react-bootstrap";

import VerticalModal from '../common/VerticalModal';

class SetTest extends Component {
	constructor(...args) {
		super(...args);

		this.state = { modalShow: false };
	}

    render() {
    	console.log("SetTest prop:",this.props);
		let modalClose = () => this.setState({ modalShow: false });

		return (
			<ButtonToolbar>
				<Button
					variant="primary"
					onClick={() => this.setState({ modalShow: true })}
					block
				>
					Set a Challenge
				</Button>

				<VerticalModal
					show={this.state.modalShow}
					onHide={modalClose}
					modaltitle={this.props.modaltitle}
					modalbody={this.props.modalbody}
					modalfooter={this.props.modalfooter}
				/>
			</ButtonToolbar>
		);
    }
}

export default SetTest;