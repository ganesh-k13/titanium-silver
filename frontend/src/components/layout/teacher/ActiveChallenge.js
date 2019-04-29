import React, { Component } from 'react';
import ActiveChallengeItem from "./ActiveChallengeItem";

class ActiveChallenge extends Component {
	render() {
		return this.props.challengeList.map((challenge)=>(
			<ActiveChallengeItem
				ID = {challenge.ID}
				timeLimitHrs = {challenge.timeLimitHrs}
				timeLimitMins = {challenge.timeLimitMins}
			/>
		));
	}
}

export default ActiveChallenge;