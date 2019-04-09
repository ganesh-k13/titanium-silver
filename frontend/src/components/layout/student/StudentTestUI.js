import React,{ Component } from "react";
import { 
	Container,
	Col,
	Row,
	Form,
	Button
} from "react-bootstrap";
import AceEditor from "react-ace";
import axios from "axios";

import "brace/mode/java";
import "brace/mode/python";
import "brace/mode/c_cpp";
import "brace/mode/php";
import "brace/mode/ruby";

import "brace/theme/monokai";
import "brace/theme/github";
import "brace/theme/tomorrow";
import "brace/theme/kuroir";
import "brace/theme/twilight";
import "brace/theme/xcode";
import "brace/theme/textmate";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/theme/terminal";

import StudentTestUISideBar from "./StudentTestUISideBar";

class StudentTestUI extends Component {

	constructor(...args){
		super(...args);
		this.state = {
			cID:"",
			code:"",
			editorWidth:"",
			mode:"c_cpp",
			progLang:"C",
			fontSize:14,
			theme:"monokai",
			questionID:""
		}
	}

	componentDidMount(){
		this.setState({
			editorWidth: document.getElementById("editorParent").clientWidth
		})
	}

	submitCode = () => {
		let inpData = {
			cID:this.state.cID,
			code:this.state.code,
			questionID:this.state.questionID,
			progLang:this.state.progLang
		}
		console.log("inpData:",inpData);
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/submitcode',
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("accessToken")
            },
            data: inpData
        }).then((resp)=>{
            console.log(resp);
        }).catch((resp)=>{
            console.log(resp);
        })
	}

	updateEditorLanguage = (e) => {
		let progLang = e.target[e.target.selectedIndex].id;
		let val = e.target.value;
		this.setState({
			[e.target.name]:val,
			progLang:progLang
		})
	}

	updateEditorProps = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	codeChange = (v) => {
		this.setState({
			"code":v
		});
	}

	render(){
		// console.log(this.state);
		return (
			<React.Fragment>
				<Container fluid={true}>
					<Row>
						<StudentTestUISideBar />
						<Col xl={10}>
							<Container>

								{/* This row has all tests that are live */}
			                    <Row style={{marginTop:"20px"}}>
			                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
			                            <Container style={paddLeftZero}>
			                                <Row>
			                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
			                                        <div>Questions:</div>
			                                    </Col>
			                                </Row>
			                                <Row style={outlineBorder}>
			                                    <Col xl={12} lg={12} md={12}>
			                                        <div>Questions appear here</div>
			                                    </Col>
			                                </Row>
			                            </Container>
			                        </Col>
			                    </Row>

			                    {/* This row has all tests set but not started */}
			                    <Row style={{marginTop:"20px"}}>
			                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
			                            <Container style={paddLeftZero}>
			                                <Row>
			                                    <Col xl={4} lg={4} md={4} style={paddLeftZero}>
			                                        <Form.Group controlId="exampleForm.ControlSelect1">
													    <Form.Label>Mode</Form.Label>
													    <select className="form-control" as="select" name="mode" onChange={this.updateEditorLanguage} value={this.state.mode}>
													        <option id="C" value="c_cpp">C</option>
													        <option id="C++" value="c_cpp">C++</option>
													        <option id="Java" value="java">Java</option>
													        <option id="Python3" value="python">Python 3</option>
													        <option id="Python" value="python">Python 2</option>
													        <option id="Ruby" value="ruby">Ruby</option>
													        <option id="PHP5.x" value="php">PHP 5.x</option>
													        <option id="PHP7.x" value="php">PHP 7.x</option>
													    </select>
													</Form.Group>
			                                    </Col>
			                                    <Col xl={4} lg={4} md={4} style={paddLeftZero}>
			                                        <Form.Group>
													    <Form.Label>Font Size</Form.Label>
													    <select className="form-control" as="select" name="fontSize" onChange={this.updateEditorProps} value={this.state.fontSize}>
															<option value="1">1</option>
															<option value="2">2</option>
															<option value="3">3</option>
															<option value="4">4</option>
															<option value="5">5</option>
															<option value="6">6</option>
															<option value="7">7</option>
															<option value="8">8</option>
															<option value="9">9</option>
															<option value="10">10</option>
															<option value="11">11</option>
															<option value="12">12</option>
															<option value="13">13</option>
															<option value="14">14</option>
															<option value="15">15</option>
															<option value="16">16</option>
															<option value="17">17</option>
															<option value="18">18</option>
															<option value="19">19</option>
															<option value="20">20</option>
															<option value="21">21</option>
															<option value="22">22</option>
															<option value="23">23</option>
															<option value="24">24</option>
															<option value="25">25</option>
													    </select>
													</Form.Group>
			                                    </Col>
			                                    <Col xl={4} lg={4} md={4} style={paddLeftZero}>
			                                        <Form.Group>
													    <Form.Label>Theme</Form.Label>
													    <select className="form-control" as="select" name="theme" onChange={this.updateEditorProps} value={this.state.theme}>
															<option value="monokai"> monokai </option>
															<option value="github"> github </option>
															<option value="tomorrow"> tomorrow </option>
															<option value="kuroir"> kuroir </option>
															<option value="twilight"> twilight </option>
															<option value="xcode"> xcode </option>
															<option value="textmate"> textmate </option>
															<option value="solarized_dark"> solarized_dark </option>
															<option value="solarized_light"> solarized_light </option>
															<option value="terminal"> terminal </option>
													    </select>
													</Form.Group>
			                                    </Col>
			                                </Row>
			                                <Row>
			                                    <Col xl={12} lg={12} md={12} style={paddLeftZero} id="editorParent">
			                                    	<AceEditor
			                                    		mode={this.state.mode}
			                                    		fontSize={parseInt(this.state.fontSize)}
			                                    		tabSize={4}
														theme={this.state.theme}
														width={this.state.editorWidth}
														value={this.state.code}
														onChange={this.codeChange}
														name="code"
														editorProps={{ $blockScrolling: true }}
														setOptions={{
															enableBasicAutocompletion: false,
															enableLiveAutocompletion: true,
															enableSnippets: false,
															showLineNumbers: true,
															tabSize: 4,
														}}
													/>
			                                    </Col>
			                                </Row>
			                            </Container>
			                        </Col>
			                    </Row>

			                    {/* This row has all completed tests */}
			                    <Row style={{marginTop:"20px"}}>
			                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
			                            <Container style={paddLeftZero}>
			                                <Row>
			                                    <Col 
			                                    	xl={{span:3, offset:5}} 
			                                    	lg={{span:3, offset:5}} 
			                                    	md={{span:3, offset:5}} 
			                                    	style={paddLeftZero}
			                                    >
			                                    	<Button 
			                                    		variant="success"
			                                    		onClick={this.submitCode}
			                                    		block
			                                    	>
			                                    		Submit
			                                    	</Button>
			                                    </Col>
			                                </Row>
			                            </Container>
			                        </Col>
			                    </Row>

			                    {/* This row has all completed tests */}
			                    <Row style={{marginTop:"20px"}}>
			                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
			                            <Container style={paddLeftZero}>
			                                <Row>
			                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
			                                        <div>Results:</div>
			                                    </Col>
			                                </Row>
			                                <Row style={outlineBorder}>
			                                    <Col xl={12} lg={12} md={12}>
			                                        <div>Results appear here</div>
			                                    </Col>
			                                </Row>
			                            </Container>
			                        </Col>
			                    </Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}



const outlineBorder = {
    border : "1px solid #000000"
};

const paddLeftZero = {
    paddingLeft:"0px"
};

const paddRightZero = {
    paddingRight:"0px"
};

export default StudentTestUI;