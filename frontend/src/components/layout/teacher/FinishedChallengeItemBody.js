import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	ListGroup
} from "react-bootstrap";

import result from "../../../images/results.png";

class FinishedChallengeItemBody extends Component {
	render() {
		return (
			<React.Fragment>
				<Container>
					<Row>
						<Col
							xl={12}
							lg={12}
							md={12}
							style={{fontSize:"24px"}}
						>
							Students Ranked:
						</Col>
					</Row>
					<Row>
						<Col
							xl={6}
							lg={6}
							md={6}
						>
							<ListGroup style={{height:"300px",overflowY:"scroll"}}>
							    <ListGroup.Item>Ram Naresh</ListGroup.Item>
							    <ListGroup.Item>Sudhir N</ListGroup.Item>
							    <ListGroup.Item>Shyam P</ListGroup.Item>
							    <ListGroup.Item>Golu M</ListGroup.Item>
							    <ListGroup.Item>KKK Akhil</ListGroup.Item>
							    <ListGroup.Item>Priya K</ListGroup.Item>
							    <ListGroup.Item>Preeti P</ListGroup.Item>
							    <ListGroup.Item>Manoj T</ListGroup.Item>
							    <ListGroup.Item>Ram YY</ListGroup.Item>
							    <ListGroup.Item>Murali P</ListGroup.Item>
							    <ListGroup.Item>Swetha I</ListGroup.Item>
							    <ListGroup.Item>TR Surya</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col
							xl={6}
							lg={6}
							md={6}
						>
							<Container>
								<div
									style={{
										marginTop:"20px",
										boxShadow: "0px 0px 6px -1px rgba(0,0,0,0.75)"
									}}
								>
									<Row>
										<Col
											xl={{span:4,offset:4}}
											lg={{span:4,offset:4}}
											md={{span:4,offset:4}}
											style={{fontSize:"24px"}}
										>
											12
										</Col>
									</Row>
									<Row>
										<Col
											xl={{span:10,offset:2}}
											lg={{span:10,offset:2}}
											md={{span:10,offset:2}}
										>
											<span style={{fontSize:"15px"}}>Students who took your test</span>
										</Col>
									</Row>

								</div>
								<div
									style={{
										marginTop:"20px",
										boxShadow: "0px 0px 6px -1px rgba(0,0,0,0.75)"
									}}
								>
									<Row>
										<Col
											xl={{span:4,offset:4}}
											lg={{span:4,offset:4}}
											md={{span:4,offset:4}}
											style={{fontSize:"24px"}}
										>
											3
										</Col>
									</Row>
									<Row>
										<Col
											xl={{span:10,offset:2}}
											lg={{span:10,offset:2}}
											md={{span:10,offset:2}}
										>
											<span style={{fontSize:"15px"}}>Most number of correct submissions</span>
										</Col>
									</Row>
								</div>

								<div
									style={{
										marginTop:"20px",
										boxShadow: "0px 0px 6px -1px rgba(0,0,0,0.75)"
									}}
								>
									<Row>
										<Col
											xl={{span:4,offset:4}}
											lg={{span:4,offset:4}}
											md={{span:4,offset:4}}
											style={{fontSize:"24px"}}
										>
											C
										</Col>
									</Row>
									<Row>
										<Col
											xl={{span:10,offset:2}}
											lg={{span:10,offset:2}}
											md={{span:10,offset:2}}
										>
											<span style={{fontSize:"15px"}}>Most used langauge</span>
										</Col>
									</Row>
								</div>
							</Container>
						</Col>
					</Row>
					<Row>
						<Col
							xl={12}
							lg={12}
							md={12}
						>
							<img src={result} alt="result" style={{
								height:"300px",
								width:"700px"
							}}/>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}

export default FinishedChallengeItemBody;