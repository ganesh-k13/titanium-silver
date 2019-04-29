import React from "react";
import {
	Container,
	Col,
	Row,
	Card,
	Button
} from "react-bootstrap";

import Jumbotron from "../../layout/home/Jumbotron.js";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";

function Home(argument) {
	return (
		<div>
			<Jumbotron
			/>
			<Container
				style={{marginBottom:"20px"}}
			>
				<Row>
					<Col>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
  								<Card.Img variant="top" src={require("./docker-card.png")} height="250px" width="150px"/>
								<Card.Title>Docker</Card.Title>
								<Card.Text>
									Built with Docker backend for maximum scalability.
								</Card.Text>
								<a href="https://www.docker.com/"><Button variant="primary">Visit Docker</Button></a>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
  								<Card.Img variant="top" src={require("./flask-card.png")} height="250px" width="150px"/>
								<Card.Title>Flask</Card.Title>
								<Card.Text>
									Fast middleware server for fast communications.
								</Card.Text>
								<a href="http://flask.pocoo.org/"><Button variant="primary">Visit Flask</Button></a>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
  								<Card.Img variant="top" src={require("./reactjs-card.png")} height="250px" width="150px"/>
								<Card.Title>ReactJS</Card.Title>
								<Card.Text>
									Simple and fast SPAs for low dynamic server render loads. 
								</Card.Text>
								<a href="https://reactjs.org/"><Button variant="primary">Visit ReactJS</Button></a>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Home;