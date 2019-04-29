import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    ButtonToolbar,
    Button
} from "react-bootstrap";
import axios from 'axios';

import {
    SERVER_IP,
    SERVER_PORT
} from "../../../globals";
import FinishedChallengeItemBody from "./FinishedChallengeItemBody";
import VerticalModal from '../common/VerticalModal';
import "./Profile.css";

class FinishedChallengeItem extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            modalShow: false,
            resultJson:{}
        }
    }

    modalClose = () => {
        this.setState({ 
            modalShow: false,
            resultJson: {}
        });
    }
    
    handleClick = () => {
        console.log("Here:")
        console.log(SERVER_IP,SERVER_PORT)
        axios({
            method:"get",
            url:"http://"+SERVER_IP+":"+SERVER_PORT+"/api/postchallengemetrics/"+this.props.ID,
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("accessToken")
            }
        })
        .then((resp)=>{
            console.log("resp:",resp);
            this.setState({
                resultJson:resp.data
            },()=>{
                this.setState({
                    modalShow:true
                })
            })
        })
        .catch((resp)=>{

        })
    }

    render() {
        return (
            <Container style={questionWrapperStyle}>
                <Row style={questionStyle}>
                    <Col xl={11} lg={11} md={11} sm={11} xs={11}>
                        <span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
                        <span style={questionDetsStyle}>Time Limit: </span>
                        <span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
                        <span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
                    </Col>
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                        <Button
                            variant="info"
                            onClick={this.handleClick}
                        >
                            Details
                        </Button>

                        <VerticalModal
                            show={this.state.modalShow}
                            modaltitle="Results"
                            onHide={this.modalClose}
                            modalbody={
                                <FinishedChallengeItemBody 
                                    addTest = {this.addTest} 
                                    hideModal = {this.modalClose}
                                    resultJson = {this.state.resultJson}
                                />
                            }
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}


const questionWrapperStyle = {
    paddingLeft:"10px",
    paddingRight:"10px",
    marginBottom: "30px"
}

const questionStyle = {
    backgroundColor:"#EAEAEA",
    marginTop:"10px",
    paddingTop:"10px",
    paddingLeft:"10px",
    paddingRight:"10px"
}


const questionNameStyle = {
    fontSize:"15px" 
}

const questionDetsStyle = {
    fontSize:"15px" 
}

export default FinishedChallengeItem;