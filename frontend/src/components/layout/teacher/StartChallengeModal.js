import React, { Component } from 'react';
import {
	Modal,
	Container,
	Row,
	Col,
	Button,
	Form,
	Alert
} from "react-bootstrap";
import axios from "axios";

class StartChallengeModal extends Component {
	constructor(...args){
		super(...args);
		this.state={
			emails:"",
			alertVariant:"",
			alertMessage:"",
			showAlert:false
		}
	}

	addEmail = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		});
	}

	startChallenge = () => {
		let inpData = {
			cID:this.props.cid,
			recipients:this.state.emails.split(";")
		}
		console.log("---inpdata---:",inpData);
		axios({
			method:"post",
			url:"http://localhost:8000/api/startchallenge",
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData

		}).then((resp)=>{
			this.setState({
				alertVariant:"success",
				alertMessage:"Mails sent, you can close the box",
				showAlert:true
			})
		}).catch((resp)=>{
			this.setState({
				alertVariant:"danger",
				alertMessage:"Server error",
				showAlert:true
			})
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
								{this.state.showAlert && <Alert variant={this.state.alertVariant}>
									{this.state.alertMessage}
								</Alert>}
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email addresss</Form.Label>
									<Form.Control name="emails" type="email" placeholder="Enter email" onChange={this.addEmail}/>
									<Form.Text className="text-muted">
										Separate multiple emails by semicolon.
									</Form.Text>
								</Form.Group>
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