import React,{ Component } from "react";
// import { Container,Col,Row,Form,Button } from "react-bootstrap";
import QuestionItem from "./QuestionItem";

class Question extends Component{

	render(){
		return this.props.questions.map((question)=>(
			<QuestionItem
				key={question.id}
				qID={question.id}
				questionName={question.questionName}
				cpu={question.cpu}
				memory={question.memory}
				testCases={question.testCases}
				deleteQuestion={this.props.deleteQuestion}
			/>
		));
	}
}

export default Question;