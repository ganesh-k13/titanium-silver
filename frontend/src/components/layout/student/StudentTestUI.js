import React,{ Component } from "react";
import { 
    Container,
    Col,
    Row,
    Form,
    Button,
    Nav,
    Tab
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
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <StudentTestUISideBar/>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    Tab 1
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Tab 2
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

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