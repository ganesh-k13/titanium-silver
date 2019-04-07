import React, { Component } from 'react';
import InactiveChallengeItem from "./InactiveChallengeItem";

class InactiveChallenge extends Component {
	render() {		
		return this.props.challengeList.map((challenge)=>(
			<InactiveChallengeItem
				key={challenge.ID}
				ID = {challenge.ID}
				timeLimitHrs = {challenge.timeLimitHrs}
				timeLimitMins = {challenge.timeLimitMins}
			/>
		));
	}
}

export default InactiveChallenge;