import React, { Component } from 'react';

export default class FinishedChallengeItem extends Component {
	render() {
		return (
			<div>
				{this.props.ID}<br/>
				{this.props.timeLimitHrs}<br/>
				{this.props.timeLimitMins}<br/>
			</div>
		);
	}
}
