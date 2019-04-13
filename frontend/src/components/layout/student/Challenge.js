import React, { Component } from 'react';
import {
	Container,
	Col,
	Row,
	Button,
	Alert,
	InputGroup,
	FormControl
} from "react-bootstrap";
import axios from "axios";

import StudentTestUI from "./StudentTestUI";

class Challenge extends Component {

	constructor(...args){
		super(...args);
		this.state={
			showTestUI:true,
			challengeID:"",
			alertVariant:"success",
			alertMessage:"",
			alertShow:false
		}
	}

	handleChallengeIDChange = (e) => {
		this.setState({
			challengeID:e.target.value
		});
	}

	loadChallenge = () => {
		let inpData = {
			challengeID:this.state.challengeID
		}
		axios({
			method: 'post',
			url: 'http://localhost:8000/api/getchallengedetails',
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData
		}).then((resp)=>{
			console.log(resp);
			this.setState({
				alertShow:true,
				alertMessage:"Success, challenge will load soon",
				alertVariant:"success"
			});
		}).catch((error)=>{
			console.log(error);
			if(error.response.status === 401){
				this.setState({
					alertShow:true,
					alertMessage:"You don't seem to be logged in",
					alertVariant:"info"
				});
			}
			else{
				this.setState({
					alertShow:true,
					alertMessage:"Challenge ID is invalid, please check again and submit again",
					alertVariant:"danger"
				});
			}
		})
	}

	render() {
		return (
			<React.Fragment>
			{
				!this.state.showTestUI &&  
				<Container style={appStyle.offsetTop}>
					<Row>
						<Col
							xl={{span:4,offset:4}}
							lg={{span:4,offset:4}}
							md={{span:4,offset:4}}
							sm={{span:4,offset:4}}
							xs={{span:4,offset:4}}
						>
							{
								this.state.alertShow && 
								<Alert variant={this.state.alertVariant}>
									{this.state.alertMessage}
								</Alert>
							}
						</Col>
					</Row>

					<Row style={appStyle.bigTitle}>
						<Col
							xl={{span:4,offset:4}}
							lg={{span:4,offset:4}}
							md={{span:4,offset:4}}
							sm={{span:4,offset:4}}
							xs={{span:4,offset:4}}
						>
							Enter you challenge ID here:
						</Col>
					</Row>
					<Row>
						<Col
							xl={{span:4,offset:4}}
							lg={{span:4,offset:4}}
							md={{span:4,offset:4}}
							sm={{span:4,offset:4}}
							xs={{span:4,offset:4}}
						>
							<InputGroup size="lg">
								<FormControl
									onChange={this.handleChallengeIDChange}
									value={this.state.challengeID}
								/>
							</InputGroup>
						</Col>
					</Row>
					<Row style={appStyle.buttonMarginTop}>
						<Col
							xl={{span:4,offset:4}}
							lg={{span:4,offset:4}}
							md={{span:4,offset:4}}
							sm={{span:4,offset:4}}
							xs={{span:4,offset:4}}
						>
							<Button 
								variant="success"
								onClick={this.loadChallenge}
								block
							>
								Let's Go!
							</Button>
						</Col>
					</Row>
				</Container>
			}
			{
				this.state.showTestUI && <StudentTestUI/>
			}
			</React.Fragment>
		);
	}
}

const appStyle = {
	offsetTop:{
		marginTop:"100px"
	},
	buttonMarginTop:{
		marginTop:"10px"
	},
	bigTitle:{
		fontSize:"25px"
	}
}


export default Challenge;