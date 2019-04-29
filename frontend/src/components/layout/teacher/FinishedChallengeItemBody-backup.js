import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    ButtonToolbar,
    Button
} from "react-bootstrap";

import FinishedChallengeItemBody from "./FinishedChallengeItemBody";
import VerticalModal from '../common/VerticalModal';

class FinishedChallengeItem extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            modalShow: false
        }
    }

    modalClose = () => {
        this.setState({ 
            modalShow: false 
        })
    }
    
    render() {
        return (
            <Container style={questionWrapperStyle}>
                <Row style={questionStyle}>
                    <Col xl={9} lg={9} md={9} sm={9} xs={9}>
                        <span style={questionNameStyle}>ID: {this.props.ID}</span><br/>
                        <span style={questionDetsStyle}>Time Limit: </span>
                        <span style={questionDetsStyle}>{this.props.timeLimitHrs} hrs</span>
                        <span style={questionDetsStyle}> {this.props.timeLimitMins} mins</span>
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                            <ButtonToolbar>
                                <Button
                                    variant="info"
                                    onClick={() => this.setState({ modalShow: true })}
                                    block
                                >
                                    Details
                                </Button>

                                <VerticalModal
                                    show={this.state.modalShow}
                                    modaltitle="Results"
                                    onHide={this.modalClose}
                                    modalbody={<FinishedChallengeItemBody addTest={this.addTest} hideModal={this.modalClose}/>}
                                />
                            </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        );
    }
}


const questionWrapperStyle = {
    paddingLeft:"10px",
    paddingRight:"10px"
}

const questionStyle = {
    marginTop:"10px",
    paddingLeft:"10px",
    paddingRight:"10px",
    borderBottom:"1px solid black"
}

const questionNameStyle = {
    fontSize:"20px" 
}

const questionDetsStyle = {
    fontSize:"15px" 
}

export default FinishedChallengeItem;