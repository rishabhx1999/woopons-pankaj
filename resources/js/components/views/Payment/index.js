import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { useParams } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import MainView from './MainView';
import './style.scss';
import {
  	PLAN_DETAIL,
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
});

const stripePromise = loadStripe('pk_test_dp1OaU9VpegKVc8OU1MfJuFM');

const mapDispatchToProps = (dispatch) => ({
	
});

const Payment = (props) => {
	let mainProps = {}

	useEffect(() => {
  		window.scrollTo(0, 0);
  		
	}, []);

	return (
		<div className="payment-page">
			<Elements stripe={stripePromise}>
				<MainView {...mainProps} />
			</Elements>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);