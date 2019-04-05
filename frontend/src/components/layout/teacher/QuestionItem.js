import React,{ Component } from "react";
import {
	Container,
	Row,
	Col,
	Button
} from "react-bootstrap";

class QuestionItem extends Component{

	render(){
		return (
			<Container style={questionWrapperStyle}>
				<Row style={questionStyle}>
					<Col xl={11} lg={11} md={11} sm={11} xs={11}>
						<span style={questionNameStyle}>{this.props.questionName}</span><br/>
						<span style={questionDetsStyle}>{this.props.cpu}</span>
						<span style={questionDetsStyle}>{this.props.memory}</span>
						<span style={questionDetsStyle}>{this.props.testCases}</span>
					</Col>
					<Col>
						<Button variant="danger" onClick={this.props.deleteQuestion}>X</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

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

export default QuestionItem;