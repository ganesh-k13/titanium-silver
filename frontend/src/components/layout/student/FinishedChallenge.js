import React, { Component } from 'react';
import FinishedChallengeItem from "./FinishedChallengeItem";

class FinishedChallenge extends Component {
	render() {		
		return this.props.challengeList.map((challenge)=>(
			<FinishedChallengeItem
				ID = {challenge}
			/>
		));
	}
}

export default FinishedChallenge;