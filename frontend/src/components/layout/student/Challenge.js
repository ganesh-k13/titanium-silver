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

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import StudentTestUI from "./StudentTestUI";

class Challenge extends Component {

	constructor(...args){
		super(...args);
		this.state={
			showTestUI:false,
			challengeID:"",
			alertVariant:"success",
			alertMessage:"",
			alertShow:false,
			questionList:[]
		}
	}

	handleChallengeIDChange = (e) => {
		this.setState({
			challengeID:e.target.value
		});
	}

	loadChallenge = () => {
		let inpData = {
			cID:this.state.challengeID
		}
		console.log(inpData);
		axios({
			method: 'post',
			url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/getchallengequestions",
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData
		}).then((resp)=>{
			console.log(resp);
			// send the question list to  studenttestUI (state update)
			// then for each question, make a sidebar tab, and populate the props.
			// to do above, we've to do similar to question and questionitem in teacher 
			this.setState({
				alertShow:true,
				alertMessage:(<div>Success, challenge will load soon</div>),
				alertVariant:"success",
				questionList:resp.data.questions
			},()=>{
				this.setState({
					showTestUI:true
				})
			});
		}).catch((error)=>{
			if(error.response===undefined){
				this.setState({
					alertShow:true,
					alertMessage:(<div>Network/Server error</div>),
					alertVariant:"danger"
				});

			}
			else if(error.response.status === 401){
				this.setState({
					alertShow:true,
					alertMessage:(<div>You don't seem to be logged in, click <a href="/login" style={{color:"black"}}> here </a> to login.</div>),
					alertVariant:"info"
				});
			}
			else{
				this.setState({
					alertShow:true,
					alertMessage:(<div>Challenge ID is invalid or Challenge hasn't started. Try again later</div>),
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
				this.state.showTestUI && 
				<StudentTestUI
					challengeID={this.state.challengeID}
					questionList={this.state.questionList}
				/>
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