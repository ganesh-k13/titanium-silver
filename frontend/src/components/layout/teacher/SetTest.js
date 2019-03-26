import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Container,Col,Row,Button } from "react-bootstrap";

class SetTest extends Component {
	// state={
	// 	title:""
	// };

	// formSumbit = (e) =>{
	// 	e.preventDefault();
	// 	console.log("form submit");
	// 	this.props.addTodo(this.state.title);
	// }

	// formChange = (e) =>{
	// 	console.log("form change");
	// 	let res = {
	// 		[e.target.name]:e.target.value
	// 	}
	// 	this.setState(res);
	// }

    render() {
    	console.log("props recieved:",this.props);
        return (
            <div>
            	<form onSubmit={this.formSubmit}>
					enter number: <input name="title" type="text" onChange={this.formChange}/>
					<input type="submit" value="submit"/>
            	</form>
            </div>
        );
    }
}

export default SetTest;