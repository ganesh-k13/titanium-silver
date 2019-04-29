import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	ButtonToolbar,
	Button
} from "react-bootstrap";
import axios from "axios";

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import StartChallengeModal from "./StartChallengeModal";
import DeleteChallengeModal from "./DeleteChallengeModal";
import "./Profile.css";

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
			url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/getchallengedetails",
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
            "http://"+SERVER_IP+":"+SERVER_PORT+"/api/",
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
					<Col xl={9} lg={9} md={9} sm={9} xs={9}>
						<span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
						<span style={questionDetsStyle}>Time Limit: </span>
						<span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
						<span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
					</Col>
					<Col xl={1} lg={1} md={1} sm={1} xs={1}>
						<Button 
							variant="info"
							id={this.props.ID}
							onClick={this.getChallengeDetails} 
						>
							Details
						</Button>
							
					</Col>
					<Col xl={1} lg={1} md={1} sm={1} xs={1}>
						<Button 
							variant="success"
							id={this.props.ID}
							onClick={this.startChallenge} 
						>
							Start
						</Button>

					</Col>
					<Col xl={1} lg={1} md={1} sm={1} xs={1}>
						<Button 
							variant="danger"
							id={this.props.ID}
							onClick={this.deleteChallenge} 
						>
							Delete
						</Button>
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

const questionWrapperStyle = {
	paddingLeft:"10px",
	paddingRight:"10px",
}

const questionStyle = {
	backgroundColor:"#EAEAEA",
	marginTop:"10px",
	paddingTop:"10px",
	paddingLeft:"10px",
	paddingRight:"10px"
}

const questionNameStyle = {
	fontSize:"15px"	
}

const questionDetsStyle = {
	fontSize:"15px"	
}

export default InactiveChallengeItem;