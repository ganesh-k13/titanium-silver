import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	ListGroup
} from "react-bootstrap";
import { VictoryPie } from 'victory';

class FinishedChallengeItemBody extends Component {
	render() {
		return (
			<Container>
				{/* Starting numbers row */}
				<Row>
					<Col>
						<Container
							style={{
								backgroundColor:"#1C4E80",
								height:"100px",color:"white",
								borderRadius:"10px",
								padding:"3px 3px 3px 3px"
							}}
						>
							<Row>
								<Col
									style={{
										textAlign:"center",
										borderBottom:"1px solid #F1F1F1"
									}}
								>
									<span
										style={{fontSize:"24px",display:"inline-block"}}
									>
										{this.props.resultJson.noOfStudents}
									</span>
								</Col>
							</Row>
							<Row>
								<Col
									style={{textAlign:"center"}}
								>
									<span
										style={{fontSize:"15px",display:"inline-block",padding:"3px 3px 3px 3px"}}
									>
										students took<br/> the challenge
									</span>
								</Col>
							</Row>
						</Container>
					</Col>

					<Col>
						<Container
							style={{
								backgroundColor:"#EA6A47",
								height:"100px",color:"white",
								borderRadius:"10px",
								padding:"3px 3px 3px 3px"
							}}
						>
							<Row>
								<Col
									style={{
										textAlign:"center",
										borderBottom:"1px solid #F1F1F1"
									}}
								>
									<span
										style={{fontSize:"24px",display:"inline-block"}}
									>
										{this.props.resultJson.rankOneStudent}
									</span>
								</Col>
							</Row>
							<Row>
								<Col
									style={{textAlign:"center"}}
								>
									<span
										style={{fontSize:"15px",display:"inline-block",padding:"3px 3px 3px 3px"}}
									>
										student got most <br/> questions correct
									</span>
								</Col>
							</Row>
						</Container>
					</Col>
					
					<Col>
						<Container
							style={{
								backgroundColor:"#0091D5",
								height:"100px",color:"white",
								borderRadius:"10px",
								padding:"3px 3px 3px 3px"
							}}
						>
							<Row>
								<Col
									style={{
										textAlign:"center",
										borderBottom:"1px solid #F1F1F1"
									}}
								>
									<span
										style={{fontSize:"24px",display:"inline-block"}}
									>
										{this.props.resultJson.mostUsedLang}
									</span>
								</Col>
							</Row>
							<Row>
								<Col
									style={{textAlign:"center"}}
								>
									<span
										style={{fontSize:"15px",display:"inline-block",padding:"3px 3px 3px 3px"}}
									>
										most used language
									</span>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
				<hr/>
				{/* Bar Graph and Pie chart row */}
				<Row>
					<Col>
						<VictoryPie
							data={this.props.resultJson.langPie}
							colorScale={["#1C4E80", "#D32D41", "#EA6A47" ]}
						/>
					</Col>
					<Col>
						Students ranked: (most test cases passed overall)
						<ListGroup>
							{
								this.props.resultJson.studentRanks!==undefined && 
								this.props.resultJson.studentRanks.map((student)=>(
									<ListGroup.Item
										key={student.USN}
									>
										{student.USN}
									</ListGroup.Item>
								))
							}
						</ListGroup>
					</Col>
				</Row>

				{/* Students ranked list */}
				<Row>
				</Row>
			</Container>
		);
	}
}

export default FinishedChallengeItemBody;