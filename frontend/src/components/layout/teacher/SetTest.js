import React, { Component } from 'react';
import { 
	Container,
	Col,
	Row,
	ButtonToolbar,
	Button,
	Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import VerticalModal from '../common/VerticalModal';
import SetTestBody from "./SetTestBody";
import {Minutes,Hours} from "./Time";
import Question from "./Question";

class SetTest extends Component {
	constructor(...args) {
		super(...args);


		this.state = { 
			modalShow: false ,
			questions:[],
			timeLimitHrs:"0",
			timeLimitMins:"30",
            "alertVariant":"",
            "alertMessage":""
		};
	}

	componentDidMount(){
		
	}
	
	removeEmptyStringsFromList = (stringList) => {
		for (var i = stringList.length - 1; i >= 0; i--) {
			if(stringList[i]===""){
				stringList.splice(i,1);
			}
		}
		return stringList;
	}

	transformQuestions = (questions) => {
		let newLineRegex = /\r?\n|\r/g;

		for (var i = questions.length - 1; i >= 0; i--) {
			questions[i]["testCases"] = this.removeEmptyStringsFromList(questions[i]["testCases"].replace(newLineRegex,"").split("---testcase---"));
			questions[i]["expectedOutputs"] = this.removeEmptyStringsFromList(questions[i]["expectedOutputs"].replace(newLineRegex,"").split("---testcase---"));	
		}
		return questions;
	}


	deleteTest = (e) => {
		const questions = Object.assign([],this.state.questions);
		for(var i=0;i<questions.length;i++){
			// eslint-disable-next-line
			if(questions[i]["id"] == e.target.id){
				break;
			}
		}
		questions.splice(i,1);
		
		this.setState({
			questions:questions
		})
	}

	addTest = (question) => {
		this.setState({ questions: [...this.state.questions, question] })
	}

	addChallenge = () => {
		console.log("addChallenge");
		console.log(this.state.questions);
		var files = new FormData();

		for (var i = 0; i < this.state.questions.length;i++) {
			var file = this.state.questions[i].selectedFile;
			console.log("file:",file);
			var filename="";
			if(this.state.questions[i].selectedFile.type === "application/gzip"){
				filename=this.state.questions[i].id+".tar.gz"
			}
			else if(this.state.questions[i].selectedFile.type === "application/x-xz"){
				filename=this.state.questions[i].id+".tar.xz"
			}
			else{
				filename=this.state.questions[i].id+".zip"				
			}
			files.set("name",filename);
			files.append("file",file,filename);
		}
		// for (var key of files.entries()) {
		// 	console.log(key[0]);
		// 	console.log(key[1]);
		// }

		// return 0;
		let questions = this.state.questions;
		
		let inpData = {
			questions:questions,
			timeLimitHrs:this.state.timeLimitHrs,
			timeLimitMins:this.state.timeLimitMins

		}
		console.log(inpData);

		axios({
			method: "post",
			url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/setchallenge",
			headers: {
				"Authorization":"Bearer "+localStorage.getItem("accessToken")
			},
			data: inpData
		}).then((resp)=>{
			console.log(resp);

			axios({
				method: "post",
				url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/uploadfiles",
				headers: {
					"Authorization":"Bearer "+localStorage.getItem("accessToken"),
					"Content-Type":"multipart/form-data"
				},
				data: files
			}).then((resp)=>{
				
				console.log(resp);
				this.setState({
	                "alertVariant":"success",
	                "alertMessage":"Submission successful, you'll be redirected back soon",
	            },()=>{
					setTimeout(()=>{this.props.history.push("/teacher")},2000);
	            })

			}).catch((resp)=>{
				console.log(resp);
				this.setState({
	                "alertVariant":"danger",
	                "alertMessage":"Server error:"+resp
	            });
			})

		}).catch((resp)=>{
			console.log(resp);
			this.setState({
                "alertVariant":"danger",
                "alertMessage":"Server error:"+resp
            });
		})
	}
	
	updateChallengeTimeDuration = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	modalClose = () => {
		this.setState({ 
			modalShow: false 
		})
	}
    
    render() {
		return (
			<div>
				<Container>
					<Row>
						<Col xl={12} lg={12} md={12} style={{marginTop:"10px"}}>
                            <Alert variant={this.state.alertVariant}>
                                {this.state.alertMessage}
                            </Alert>
						</Col>
					</Row>

					<Row>
						<Col xl={12} lg={12} md={12} style={titleStyle}>
							Set a Test
						</Col>
					</Row>

					<Row>
						<Col xl={6} lg={6} md={6}>
							<Hours updateTime={this.updateChallengeTimeDuration} timeLimitHrs={this.state.timeLimitHrs}/>
						</Col>
						<Col xl={6} lg={6} md={6}>
							<Minutes updateTime={this.updateChallengeTimeDuration} timeLimitMins={this.state.timeLimitMins}/>
						</Col>
					</Row>

					<Row>
						<Col xl={12} lg={12} md={12} >
							Questions
							<div id="questionBox" style={questionsBoxStyle}>
								<Question questions={this.state.questions} deleteQuestion={this.deleteTest}/>
							</div>
						</Col>
					</Row>

					<Row>
						<Col xl={12} lg={12} md={12}>
							<ButtonToolbar>
								<Button
									variant="primary"
									onClick={() => this.setState({ modalShow: true })}
									block
								>
									Add a question
								</Button>

								<VerticalModal
									show={this.state.modalShow}
									modaltitle="Question"
									modalbody={<SetTestBody addTest={this.addTest} hideModal={this.modalClose}/>}
								/>
							</ButtonToolbar>
						</Col>
					</Row>

					<Row style={{marginTop:"10px"}}>
						<Col xl={6} lg={6} md={6}>
							<Button
								variant="success"
								onClick={this.addChallenge}
								block
							>
								Done
							</Button>
						</Col>
						<Col xl={6} lg={6} md={6}>
							<Link to={"/teacher"}>
								<Button
									variant="danger"
									block
								>
									Cancel
								</Button>
							</Link>
						</Col>
					</Row>
				</Container>

			</div>
		);
    }
}

const titleStyle = {
	fontSize:"24px",
	marginBottom:"10px"
}

const questionsBoxStyle = {
	marginBottom:"10px",
	height:"300px",
	// border:"1px solid black",
	boxShadow: "0px 0px 5px -2px rgba(0,0,0,0.75)",
	overflowY:"scroll"
}

export default SetTest;