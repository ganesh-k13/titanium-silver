import React,{ Component } from "react";
// import { Container,Col,Row,Form,Button } from "react-bootstrap";
import QuestionItem from "./QuestionItem";
// import uuidv4 from "uuid/v4";

class Question extends Component{

	render(){
		return this.props.questions.map((question)=>(
			<QuestionItem 
				questionName={question.questionName}
				cpu={question.cpu}
				memory={question.memory}
				testCases={question.testCases}
			/>
		));
	}
}

export default Question;