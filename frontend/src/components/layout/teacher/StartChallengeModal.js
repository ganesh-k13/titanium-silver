import React, { Component } from 'react';
import {
	Modal,
	Container,
	Row,
	Col,
	Button
} from "react-bootstrap";
import axios from "axios";

class StartChallengeModal extends Component {
	constructor(...args){
		super(...args);
		this.state={

		}
	}

	startChallenge = () => {
		let inpData = {
			cID:this.props.ID
		}
		axios({
			method:"post",
			url:"http://localhost:5000/api/startchallenge",
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData

		})
	}

	render() {
		return (
			<Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.props.onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Share the challenge to start it
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
					<Container>
						<Row>
							<Col>
							</Col>
						</Row>
					</Container>
                </Modal.Body>
                <Modal.Footer>
                	<Button variant="success" onClick={this.startChallenge}>Start</Button>
                	<Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
		);
	}
}

export default StartChallengeModal;