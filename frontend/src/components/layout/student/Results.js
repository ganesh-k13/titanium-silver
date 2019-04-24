import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
} from "react-bootstrap";

class Results extends Component {

	splitListIntoGroupsOfFour = (inpList) => {
		var res = [];
		for(var i=0;i<inpList.length;i+=4){
			res.push(inpList.slice(i,i+4));
		}
		return res;
	}

	render() {
		// console.log(this.props.resultJson);
		var values = Object.values(this.props.resultJson)
		var final = [];
		var counter = 0;
		var portion = {};

		for (var key in this.props.resultJson) {
			if (counter !== 0 && counter % 4 === 0) {
				final.push(portion);
				portion = {};
			}
			portion[key] = values[counter];
			counter++
		}
		final.push(portion);


		var output = final.map((ele) => {
			var res=[];
			var i=0;
			for(var key in ele){
				if(key!=="testCasesResult"){
					res.push((
						<Col
							xl={3}
							lg={3}
							md={3}
						>
							Test Case {i++}: {(()=>{
								// console.log("in anonymous");
								if(ele[key] === true){
									return (<div style={{color:"green"}}>Pass</div>);
								}
								else{
									return <div style={{color:"red"}}>Fail</div>;
								}
							})()} 
						</Col>					
					));
				}
			}
			// console.log(res);
			return(
				<Row>
					{res[0]}
					{res[1]}
					{res[2]}
					{res[3]}
				</Row>
			);
		});

		// console.log("output:",output);

		return (
			<Container>
				<Row>
					<Col
						xl={12}
						lg={12}
						md={12}
					>
						{this.props.resultJson.testCasesResult}
					</Col>
				</Row>
				{output}
			</Container>
		);
	}
}

export default Results;