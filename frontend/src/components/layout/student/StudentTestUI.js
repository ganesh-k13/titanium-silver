import React,{ Component } from "react";
import { 
	Container,
	Col,
	Row,
	Form
} from "react-bootstrap";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/mode/python";
import "brace/mode/c_cpp";

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
			code:"",
			editorWidth:"",
			mode:"c_cpp",
			fontSize:14,
			theme:"monokai"
		}
	}

	componentDidMount(){
		this.setState({
			editorWidth: document.getElementById("editorParent").clientWidth
		})
	}

	updateEditorProps = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	codeChange = (v) => {
		// console.log(e);
		this.setState({
			"code":v
		});
	}

	render(){
		console.log(this.state);
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
													    <select className="form-control" as="select" name="mode" onChange={this.updateEditorProps} value={this.state.mode}>
													        <option value="c_cpp">C and C++</option>
													        <option value="java">java</option>
													        <option value="python">python</option>
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