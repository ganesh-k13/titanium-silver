import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	ButtonToolbar,
	Button
} from "react-bootstrap";
import axios from "axios";

import VerticalModal from '../common/VerticalModal';
import ChallengeDetailsModal from "./ChallengeDetailsModal";
import StartChallengeModal from "./StartChallengeModal";
import DeleteChallengeModal from "./DeleteChallengeModal";

class InactiveChallengeItem extends Component {
	constructor(...args){
		super(...args);
		this.state = {
			challengemodalshow:false,
			startmodalshow:false,
			deletemodalshow:false,
			data:""
		}
	}

    handleClose = () => {
        this.setState({ 
			challengemodalshow:false,
			startmodalshow:false,
			deletemodalshow:false 
		});
    }

	getChallengeDetails = (e) =>{
		let challengeThis = this;
		let inpData = {
			cID:e.target.id
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
			challengeThis.setState({
				challengemodalshow:true,
				data:resp.data
			});
		}).catch((resp)=>{
			console.log(resp);

		})
	}

	startChallenge = (e) => {
		this.setState({
			startmodalshow:true
		});
	}

	deleteChallenge = (e) => {
		let challengeThis = this;
	    axios.get(
            "http://localhost:8000/api/",
            {
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem("accessToken")
                }
            }
        )
        .then(function(resp) {
			challengeThis.setState({
				modaltitle:"Confirm, this action cannot be reversed",
				modalshow:true
			});
        })
        .catch(function(resp) {
            challengeThis.setState({
                showAlert:true
            });            
        })
	}

	render() {
		return (
			<Container style={questionWrapperStyle}>
				<Row style={questionStyle}>
					<Col xl={7} lg={7} md={7} sm={7} xs={7}>
						<span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
						<span style={questionDetsStyle}>Time Limit: </span>
						<span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
						<span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
					</Col>
					<Col xl={2} lg={2} md={2} sm={2} xs={2}>
						<ButtonToolbar>
							<Button 
								variant="info"
								id={this.props.ID}
								onClick={this.getChallengeDetails} 
								block
							>
								Details
							</Button>
							
						</ButtonToolbar>
					</Col>
					<Col xl={2} lg={2} md={2} sm={2} xs={2}>
						<ButtonToolbar>
							<Button 
								variant="success"
								id={this.props.ID}
								onClick={this.startChallenge} 
								block
							>
								Start
							</Button>

						</ButtonToolbar>
					</Col>
					<Col xl={1} lg={1} md={1} sm={1} xs={1}>
						<ButtonToolbar>
							<Button 
								variant="danger"
								id={this.props.ID}
								style={{paddingLeft:"8px"}} 
								onClick={this.deleteChallenge} 
								block
							>
								Delete
							</Button>
						</ButtonToolbar>
					</Col>
					<StartChallengeModal
						show={this.state.startmodalshow}
						onHide={this.handleClose}
						data={this.state.data}
						cid={this.props.ID}
					/>
					<DeleteChallengeModal
						show={this.state.deletemodalshow}
						onHide={this.handleClose}
						data={this.state.data}
						cid={this.props.ID}
					/>
				</Row>
			</Container>
		);
	}
}

					// <ChallengeDetailsModal
					// 	show={this.state.challengemodalshow}
					// 	onHide={this.handleClose}
					// 	data={this.state.data}
					// />


const questionWrapperStyle = {
	paddingLeft:"10px",
	paddingRight:"10px"
}

const questionStyle = {
	marginTop:"10px",
	paddingLeft:"10px",
	paddingRight:"10px",
	borderBottom:"1px solid black"
}

const questionNameStyle = {
	fontSize:"20px"	
}

const questionDetsStyle = {
	fontSize:"15px"	
}

export default InactiveChallengeItem;