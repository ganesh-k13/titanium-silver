import React, { Component } from 'react';
import { 
    Modal,
    Container,
    Col,
    Row
} from "react-bootstrap";

class ChallengeDetailsModal extends Component {

    render() {
        var data = this.props.data;
        if(data!==undefined){
            var questions = data.questions;
            var res;
            for (var i = questions.length - 1; i >= 0; i--) {
                var name = questions[i].questionName;
                var cpu = questions[i].cpu;
                var memory = questions[i].memory;
                // res[i] = {
                //     name:name,
                //     cpu:cpu,
                //     memory:memory,
                //     testCase:[],
                //     expectedOutput:[]
                // }
                res = "<hr><div>Name:"+name+"</div><div>CPU:"+cpu+"</div><div>Memory:"+memory+"</div>";
                for (var j = questions[i].testCases.length - 1; j >= 0; j--) {
                    var testCase = questions[i].testCases[j][0];
                    var expectedOutput = questions[i].testCases[j][1];
                    res += "<div> Test Case:"+testCase+"</div><div> Expected Output:"+expectedOutput+"</div><hr>";
                    // res[i]["testCase"].push(testCase);
                    // res[i]["expectedOutput"].push(expectedOutput);
                }
            }

            // console.log(res);

            return (
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={this.props.onHide}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Challenge Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    {res}
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
            );
        }
        else{
            return (
                <div></div>
            );   
        }
    }
}

export default ChallengeDetailsModal;