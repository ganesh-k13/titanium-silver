import React,{ Component } from "react";
import { 
    Container,
    Col,
    Row,
    Button,
    Nav,
    Tab,
    Spinner
} from "react-bootstrap";
import axios from "axios";

import Editor from "./Editor";
import Results from "./Results";
import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import "./Profile.css"

class StudentTestUI extends Component {

    constructor(...args){
        super(...args);
        this.state = {
            challengeID:""
        }
    }

    componentDidMount(){
        this.setState({
            challengeID:this.props.challengeID
        })
        for (var i = this.props.questionList.length - 1; i >= 0; i--) {
            this.setState({
                [[this.props.questionList[i].questionID]+"code"]:"",
                [[this.props.questionList[i].questionID]+"progLang"]:"C",
                [[this.props.questionList[i].questionID]+"disableBtn"]:false,
                [[this.props.questionList[i].questionID]+"resultJson"]:{}
            },()=>{
                console.log(this.state);
            });
        }
    }

    submitCode = (e) => {
        let name = e.target.name;
        this.setState({
            [name+"disableBtn"]:true
        },()=>{
            let inpData = {
                challengeID:this.state.challengeID,
                code:this.state[name+"code"],
                questionID:name,
                progLang:this.state[name+"progLang"]
            }
            console.log("inpData:",inpData);
            axios({
                method: 'post',
                url: "http://"+SERVER_IP+":"+SERVER_PORT+"/api/submitcode",
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("accessToken")
                },
                data: inpData
            }).then((resp)=>{
                console.log(resp);
                this.setState({
                    [name+"resultJson"]:resp.data,
                    [name+"disableBtn"]:false
                })
            }).catch((resp)=>{
                console.log(resp);
            })
        });
    }

    updateOptions = (name,value) => {
        this.setState({
            [name]:value
        })
    }

    render(){
        // console.log(this.state);
        var navItems =  this.props.questionList.map((question,index)=>(
            <Nav.Item
                key={question.questionID}
            >
                <Nav.Link 
                    eventKey={index.toString()}
                    style={appStyle.blackTabs}
                >
                    Question {(index+1).toString()}
                </Nav.Link>
            </Nav.Item>
        ));

        var tabItems =  this.props.questionList.map((question,index)=>(
            <Tab.Pane 
                key={question.questionID}
                eventKey={index.toString()}
            >
                <Container>
                    <Row>
                        <Col 
                            xl={12}
                            style={{paddingLeft:"15px", fontSize:"20px", marginTop:"10px"}}
                        >
                            {question.questionName}
                        </Col>
                    </Row>
                    <hr/>
                    <Row
                            style={{paddingLeft:"15px"}}
                    >
                        <Col
                        >
                            <Editor
                                langToDisplay = {(()=>{
                                    var langToDisplay = {
                                        C:false,
                                        CPP:false,
                                        Java:false,
                                        Python3:false,
                                        Python:false,
                                        Ruby:false,
                                        PHP5x:false,
                                        PHP7x:false,
                                    };
                                    for(var key in question){
                                        langToDisplay[key] = question[key]
                                    }
                                    // console.log(langToDisplay)
                                    return langToDisplay
                                })()}
                                updateOptions={this.updateOptions}
                                editorName={question.questionID}
                                code={this.state[question.questionID+"code"]}
                            />
                        </Col>
                    </Row>
                    <Row
                        style={appStyle.shiftDown}
                    >
                        <Col
                            xl={{span:4,offset:4}}
                            lg={{span:4,offset:4}}
                            md={{span:4,offset:4}}
                            sm={{span:4,offset:4}}
                            xs={{span:4,offset:4}}
                        >    
                            <Button
                                variant="success"
                                onClick={this.submitCode}
                                name={question.questionID}
                                disabled={this.state[question.questionID+"disableBtn"]}
                                block
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row
                        style={appStyle.title}
                    >
                        <Col
                            xl={12}
                            lg={12}
                            md={12}
                            style={{marginBottom:"15px"}}
                        >
                            Submission Result:
                            {this.state[question.questionID+"disableBtn"] && 
                            <Spinner 
                                animation="border" 
                                role="status"
                                variant="primary"
                            >
                                <span className="sr-only">Loading...</span>
                            </Spinner>}
                        </Col>
                    </Row>
                    <Row style={appStyle.shiftDown}>
                        <Col xl={12}>
                            <Results
                                resultJson={(()=>{
                                    if(this.state[question.questionID+"resultJson"] === null ||
                                        this.state[question.questionID+"resultJson"] ===undefined
                                    ){
                                        return {}
                                    }
                                    return this.state[question.questionID+"resultJson"];
                                })()}
                            />
                        </Col>
                    </Row>
                </Container>
            </Tab.Pane>
        ));

        return(
            <React.Fragment>
                <Tab.Container 
                    defaultActiveKey="0"
                    transition={false}
                >
                    <Row
                        style={appStyle.margins}
                    >
                        <Col 
                            sm={2}
                            style={{borderRight:"1px solid #8C8B8B",paddingRight:"2px"}}
                        >
                            <div
                                style={{marginLeft:"2px"}}
                            >
                                <Nav variant="pills" className="flex-column">
                                    {navItems}
                                </Nav>
                            </div>
                        </Col>
                        <Col 
                            sm={10}
                        >
                            <Tab.Content>
                                {tabItems}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </React.Fragment>
        );
    }
}

const appStyle = {
    blackTabs:{
        color:"#2D2D2D"
    },
    shiftDown:{
        marginTop:"10px"
    },
    margins:{
        marginRight:"0px",
        marginTop:"60px"
    },
    title:{
        fontSize:"24px"
    }
}

export default StudentTestUI;