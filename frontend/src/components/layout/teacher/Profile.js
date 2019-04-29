import React, { Component } from "react";
import { 
    Container,
    Col,
    Row,
    Button,
    Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import ActiveChallenge from "./ActiveChallenge";
import InactiveChallenge from "./InactiveChallenge";
import FinishedChallenge from "./FinishedChallenge";

class Profile extends Component {

    constructor(...args){
        super(...args);
        this.state={
            ID:"",
            name:"",
            username:"",
            designation:"",
            noOfChallenges:"",
            showAlert:false,
            activeChallenges:[],
            inactiveChallenges:[],
            finishedChallenges:[],
        }
    }

    componentDidMount(){
        let profileThis = this;
        axios.get(
            "http://"+SERVER_IP+":"+SERVER_PORT+"/api/getteacherdetails",
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
                console.log(resp);
                let respData = {
                    ID:resp.data.ID,
                    name:resp.data.name,
                    username:resp.data.username,
                    designation:resp.data.designation,
                    noOfChallenges:resp.data.noOfChallenges
                }
                profileThis.setState(respData);
            }    
        })
        .catch(function(resp) {
            profileThis.setState({
                showAlert:true
            });            
        })

        axios.get(
            "http://"+SERVER_IP+":"+SERVER_PORT+"/api/getteacherchallenges",
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
                var activeChallenges=[];
                var inactiveChallenges=[];
                var finishedChallenges=[];

                for (var i = challenges.length - 1; i >= 0; i--) {
                    if(challenges[i].status === "INACTIVE"){
                        inactiveChallenges.push(challenges[i]);
                    }
                    else if(challenges[i].status === "ACTIVE"){
                        activeChallenges.push(challenges[i]);
                    }
                    else{
                        finishedChallenges.push(challenges[i]);
                    }
                }

                profileThis.setState({
                    activeChallenges:activeChallenges,
                    inactiveChallenges:inactiveChallenges,
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

    render() {
        console.log("state:",this.state)
        return (
            <div>
                <Container>
                    <Row>
                        <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                            {this.state.showAlert===true && <Alert variant="info" style={{marginTop:"10px"}}>
                                You don't seem to be logged in, click 
                                <Link to={"/login"} style={{marginLeft:"1px","color":"#000"}}> here </Link> to login.
                            </Alert>}
                        </Col>
                    </Row>
                    {/* This row is just title only */}
                    <Row style={profileTitle}>
                        <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                            Teacher
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
                                    <Col xl={2} lg={2} md={2}>
                                        <b>Name</b>: {this.state.name}
                                    </Col>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>Username</b>: {this.state.username}
                                    </Col>
                                    <Col xl={3} lg={3} md={3}>
                                        <b>Designation</b>: {this.state.designation}
                                    </Col>
                                    <Col xl={2} lg={2} md={2}>
                                        <b>No Of Challenges</b>: {this.state.noOfChallenges}
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>

                    {/* This row handles the button to set tests */}
                    <Row style={{marginTop:"10px"}}>
                        <Col md={{ span: 4, offset: 4 }}  lg={{ span: 4, offset: 4 }}  xl={{ span: 4, offset: 4 }}>
                            <Link to={"/setTest"}>
                                <Button
                                    variant="primary"
                                    block
                                >
                                    Set a Challenge
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    {/* This row has all tests that are live */}
                    <Row style={{marginTop:"20px"}}>
                        <Col xl={12} lg={12} md={12} style={paddRightZero}>
                            <Container style={paddLeftZero}>
                                <Row>
                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                                        <div>Active Challenges</div>
                                    </Col>
                                </Row>
                                <Row style={outlineBorder}>
                                    <Col xl={12} lg={12} md={12}>
                                        <ActiveChallenge challengeList={this.state.activeChallenges}/>
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
                                    <Col xl={12} lg={12} md={12} style={paddLeftZero}>
                                        <div>Challenges yet to be started</div>
                                    </Col>
                                </Row>
                                <Row style={outlineBorder}>
                                    <Col xl={12} lg={12} md={12}>
                                        <InactiveChallenge challengeList={this.state.inactiveChallenges}/>
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
                                        <div>Completed Challenges</div>
                                    </Col>
                                </Row>
                                <Row style={outlineBorder}>
                                    <Col xl={12} lg={12} md={12}>
                                        <FinishedChallenge challengeList={this.state.finishedChallenges}/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
// <Link to="/settest" params={{ testvalue: "hello" }}> 
//     <Button className="btn-block">
//         Set Test 
//     </Button>
// </Link>
// {/*<SetTest modaltitle="Set Test" modalbody={<SetTestBody/>} modalfooter={<SetTestFooter/>}/>*/}
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