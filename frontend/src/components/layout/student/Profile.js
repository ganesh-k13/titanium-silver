import React,{ Component } from "react";
import { 
    Container,
    Col,
    Row,
    Alert,
    Button,
    ButtonToolbar
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";

class Profile extends Component{

    constructor(...args){
        super(...args);
        this.state = {
            ID:"",
            name:"",
            username:"",
            semester:"",
            noOfChallenges:"",
            showAlert:false
        }
    }

    componentDidMount(){
        let profileThis = this;
        axios.get(
            "http://"+SERVER_IP+":"+SERVER_PORT+"/api/getstudentdetails",
            {
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem("accessToken")
                }
            }
        )
        .then(function (resp) {
            console.log(resp);
            if(resp.data === "not valid"){
                profileThis.setState({
                    showAlert:true
                });
            }
            else{
                let respData = {
                    ID:resp.data.ID,
                    name:resp.data.name,
                    username:resp.data.username,
                    semester:resp.data.semester,
                    noOfChallenges:resp.data.noOfChallenges
                }
                profileThis.setState(respData);
            }
        })
        .catch(function (error) {
            profileThis.setState({
                showAlert:true
            });
        })
    }

    render(){
        return (
            <div>
                <Container>
                    {/* This row is just title only */}
                    <Row>
                        <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                            {this.state.showAlert===true && <Alert variant="info" style={{marginTop:"10px"}}>
                                You don't seem to be logged in, click 
                                <Link to={"/login"} style={{marginLeft:"1px","color":"#000"}}> here </Link> to login.
                            </Alert>}
                        </Col>
                    </Row>
                    <Row style={profileTitle}>
                        <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                            Student
                        </Col>
                    </Row>

                    {/* This row handles profile information */}
                    <Row style={outlineBorder}>
                        <Col xl={12} lg={12} md={12}>
                            <Container>
                                <Row>
                                    <Col xl={2} lg={2} md={2}>
                                        <b>ID</b>: {this.state.ID}
                                    </Col>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>Name</b>: {this.state.name}
                                    </Col>
                                    <Col xl={4} lg={4} md={4}>
                                        <b>Username</b>: {this.state.username}
                                    </Col>
                                    <Col xl={1} lg={1} md={1}>
                                        <b>Semester</b>: {this.state.semester}
                                    </Col>
                                    <Col xl={2} lg={2} md={2}>
                                        <b>No Of Challenges</b>: {this.state.noOfChallenges}
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                    <Row style={{marginTop:"10px"}}>
                        <Col md={{ span: 5, offset: 5 }}  lg={{ span: 5, offset: 5 }}  xl={{ span: 5, offset: 5 }}>
                            <ButtonToolbar>
                                <Link to={"/enterChallenge"}>
                                    <Button
                                        variant="primary"
                                        block
                                    >
                                        Enter a Challenge
                                    </Button>
                                    <div></div>
                                </Link>
                            </ButtonToolbar>
                        </Col>
                    </Row>


                    {/* This row handles completed challenges information */}
                    <Row style={{marginTop:"10px"}}>
                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
                            <Container style={paddLeftZero}>
                                <Row>
                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                                        <div>Completed Challenges</div>
                                    </Col>
                                </Row>
                                <Row style={outlineBorder}>
                                    <Col xl={12} lg={12} md={12}>
                                        <div>Challenges appear here</div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

const profileTitle = {
    
};

const outlineBorder = {
    border : "1px solid #000000"
};

const paddLeftZero = {
    paddingLeft:"0px"
};

const paddRightZero = {
    paddingRight:"0px"
};

export default Profile;