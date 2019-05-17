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
import "./Profile.css";
import FinishedChallenge from "./FinishedChallenge";

class Profile extends Component{

    constructor(...args){
        super(...args);
        this.state = {
            ID:"",
            name:"",
            username:"",
            semester:"",
            noOfChallenges:"",
            showAlert:false,
            finishedChallenges:[]
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
        });

        axios.get(
            "http://"+SERVER_IP+":"+SERVER_PORT+"/api/getstudentchallenges",
            {
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem("accessToken")
                }
            }
        )
        .then(function(resp) {
            if(resp.data === "not valid"){
                profileThis.setState({
                    showAlert:true
                });
            }
            else{
                var challenges = resp.data.challenges;
                var finishedChallenges=challenges;

                profileThis.setState({
                    finishedChallenges:finishedChallenges
                })

            }    
        })
        .catch(function(resp) {
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
                        <Col xl={12} lg={12} md={12} style={title}>
                            Welcome back {this.state.name}!
                        </Col>
                    </Row>
                    <hr className="style14"/>
                    {/* This row handles profile information */}
                    <Row style={outlineBorder}>
                        <Col xl={12} lg={12} md={12}>
                            <Container>
                                <Row>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>ID</b><br/> {this.state.ID}
                                    </Col>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>Username</b><br/> {this.state.username}
                                    </Col>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>Semester</b><br/> {this.state.semester}
                                    </Col>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>No Of Challenges</b><br/> {this.state.noOfChallenges}
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <hr className="style14"/>

                    <Row style={{marginTop:"40px"}}>
                        <Col 
                            md={{ span: 4, offset: 4 }}  
                            lg={{ span: 4, offset: 4 }}  
                            xl={{ span: 4, offset: 4 }}
                        >
                            <Link to={"/enterChallenge"}>
                                <Button
                                    variant="primary"
                                    block
                                >
                                    Enter a Challenge
                                </Button>
                                <div></div>
                            </Link>
                        </Col>
                    </Row>


                    {/* This row handles completed challenges information */}
                    <Row style={{marginTop:"10px"}}>
                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
                            <Container style={paddLeftZero}>
                                <Row>
                                    <Col xl={12} lg={12} md={12} style={title}>
                                        <div>Completed Challenges</div>
                                    </Col>
                                </Row>
                            </Container>
                            <hr className="style14"/>
                            <Container style={paddLeftZero}>
                                <Row>
                                    <Col xl={12} lg={12} md={12} style={others}>
                                        <FinishedChallenge challengeList={this.state.finishedChallenges}/>
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
};

const paddLeftZero = {
    paddingLeft:"0px"
};

const title = {
    paddingLeft:"20px",
    fontSize:"25px",
    marginTop:"20px"
};

const others = {
    paddingLeft:"30px"
};

const paddRightZero = {
    paddingRight:"0px"
};

export default Profile;