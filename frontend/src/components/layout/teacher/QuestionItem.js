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
						<div
						>
							<span style={questionNameStyle}>{this.props.questionName}</span><br/>
							CPU:<span style={questionDetsStyle}>{this.props.cpu}</span>
							Memory:<span style={questionDetsStyle}>{this.props.memory}</span>
						</div>
					</Col>
					<Col xl={1} lg={1} md={1} sm={1} xs={1}>
						<Button variant="outline-danger" id={this.props.qID} onClick={this.props.deleteQuestion}>X</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

const questionWrapperStyle = {
	paddingLeft:"10px",
	paddingRight:"10px",
	marginBottom:"5px",
	overflowX:"hidden",
	borderBottom:"1px solid #8c8b8b"
}

const questionStyle = {
	marginTop:"10px",
	paddingLeft:"10px",
	paddingRight:"10px"
}

const questionNameStyle = {
	fontSize:"20px"	
}

const questionDetsStyle = {
	fontSize:"12px",
	marginRight:"3px"
}

export default QuestionItem;