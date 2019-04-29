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
import VerticalModal from "../common/VerticalModal";
import "./Profile.css";

class ActiveChallengeItem extends Component {

	constructor(...args){
		super(...args);
		this.state = {
			modalShow:false,
			modalBody:"",
			modaltitle:""
		}
	}

	stopChallenge = () => {
		let inpData = {
			cID:this.props.ID
		}
        axios({
			method: 'post',
			url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/stopchallenge",
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData
		}).then((resp)=>{
			console.log(resp);
			this.setState({
				modalShow:true,
				modalBody:"Stopped successfully",
				modaltitle:"Stop Challenge"
			});
		}).catch((resp)=>{
			console.log(resp);
			this.setState({
				modalShow:true,
				modalBody:"Server error",
				modaltitle:"Stop Challenge"
			});
		})
	}

	handleClose = () => {
		this.setState({
			modalShow:false
		})
	}

	render() {
		return (
			<Container style={questionWrapperStyle}>
				<Row style={questionStyle}>
					<Col xl={11} lg={11} md={11} sm={11} xs={11}>
						<span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
						<span style={questionDetsStyle}>Time Limit: </span>
						<span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
						<span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
					</Col>
					<Col xl={1} lg={1} md={1} sm={1} xs={1}>
						<Button 
							variant="danger"
							id={this.props.ID}
							style={{paddingLeft:"8px"}} 
							onClick={this.stopChallenge} 								
						>
							Stop
						</Button>
					</Col>
					<VerticalModal
						show={this.state.modalShow}
						onHide={this.handleClose}
						modaltitle={this.state.modaltitle}
						modalbody={this.state.modalBody}
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

export default ActiveChallengeItem; 