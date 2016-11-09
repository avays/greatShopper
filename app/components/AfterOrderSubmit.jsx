import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


/* -----------------    COMPONENT     ------------------ */

class AfterOrderSubmit extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { charge } = this.props
		return (
			<div>
				{
					(charge && !charge.received) ?
					<span>Move along, move along...</span>
					:
					<div>
						{
							charge.received && charge.chargeData.id ? 
							<div>
								<h3>Payment Success!</h3>
								<p>Keep this transaction ID for your records: {charge.chargeData.id}</p>
								<p>You should receive an email confirmation shortly.</p>
								<LinkContainer to="/">
									<Button>Cool!</Button>
								</LinkContainer>
							</div>
							:
							<div>
								<h3>Payment Failure!</h3>
								<p>Here's what we know: { charge.chargeData.message }</p>
							</div>
						}
					</div>
				}
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ charge }) => ({ charge });


export default connect(mapState, null)(AfterOrderSubmit);



