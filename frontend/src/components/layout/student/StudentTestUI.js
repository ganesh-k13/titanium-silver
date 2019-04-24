import React,{ Component } from "react";
import { 
    Container,
    Col,
    Row,
    Form,
    Button,
    Nav,
    Tab,
    Spinner
} from "react-bootstrap";
import axios from "axios";

import Editor from "./Editor";
import Results from "./Results";
import LoadingButton from "../common/LoadingButton";

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
                url: 'http://localhost:8000/api/submitcode',
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
                        <Col xl={12}>
                            {question.questionName}
                        </Col>
                    </Row>
                    <Row>
                        <Col 
                        >
                            <Editor
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
                                variant="primary"
                                onClick={this.submitCode}
                                name={question.questionID}
                                disabled={this.state[question.questionID+"disableBtn"]}
                                block
                            >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    <Row
                        style={appStyle.title}
                    >
                        <Col
                            xl={12}
                            lg={12}
                            md={12}
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
                        style={appStyle.noRightMargin}
                    >
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                {navItems}
                            </Nav>
                        </Col>
                        <Col sm={10}>
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
        color:"#000000"
    },
    shiftDown:{
        marginTop:"10px"
    },
    noRightMargin:{
        marginRight:"0px"
    },
    shiftDown:{
        marginTop:"10px"
    },
    title:{
        fontSize:"24px"
    }
}

export default StudentTestUI;