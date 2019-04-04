import React,{ Component } from "react";

class QuestionItem extends Component{

	render(){
		return (
			<div style={questionWrapperStyle}>
				<div style={questionStyle}>
					<span style={questionNameStyle}>{this.props.questionName}</span><br/>
					<span style={questionDetsStyle}>{this.props.cpu}</span>
					<span style={questionDetsStyle}>{this.props.memory}</span>
					<span style={questionDetsStyle}>{this.props.testCases}</span>
				</div>
			</div>
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