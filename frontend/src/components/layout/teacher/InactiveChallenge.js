import React, { Component } from 'react';
import InactiveChallengeItem from "./InactiveChallengeItem";

class InactiveChallenge extends Component {
	render() {		
		return this.props.challengeList.map((challenge)=>(
			<InactiveChallengeItem
				ID = {challenge.ID}
				timeLimitHrs = {challenge.timeLimitHrs}
				timeLimitMins = {challenge.timeLimitMins}
			/>
		));
	}
}

export default InactiveChallenge;