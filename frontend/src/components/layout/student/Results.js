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

		var compilePass;
		var codeMessage;
		var output = final.map((ele) => {
			var res=[];
			var i=0;
			for(var key in ele){
				var tcEle;
				if(key==="compilePass"){
					if(ele[key] === true){
						compilePass = (<div>Compile:<span style={{color:"green"}}>Pass</span></div>);
					}
					else{
						compilePass = (<div>Compile:<span style={{color:"red"}}>Fail</span></div>);
					}
				}
				if(key==="codeMessage"){
					codeMessage = (<div><span style={{backgroundColor:"#CACACA",padding:"5px 5px 5px 5px"}}>{ele[key]}</span></div>);
				}
				if(key!=="compilePass" && key!=="codeMessage" && ele[key] === true){
					tcEle =  (<div style={{color:"green"}}>Pass</div>);
				}
				else if (key!=="compilePass"){
					tcEle =  (<div style={{color:"red"}}>Fail</div>);
				}
				if(key!=="testCasesResult" && key!=="codeMessage" && key!=="compilePass"){
					res.push((
						<Col
							xl={3}
							lg={3}
							md={3}
						>
							Test Case {i++}: {tcEle} 
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
						{compilePass}
						{codeMessage}
					</Col>
				</Row>

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