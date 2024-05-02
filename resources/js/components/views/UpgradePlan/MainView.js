import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaLinkedinIn } from 'react-icons/fa';
import footerlogo from "../../../../../public/images/black-logo.png";

import features1 from "../../../assets/images/features1.png";
import { TiTick } from 'react-icons/ti';
import Plans from '../Plans';

const video1 = "/images/video1.mp4";

import {
  	FEATCH_CUSTOMER_PLANS,
  	FEATCH_BUSINESS_PLANS
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	currentUser: state.common.currentUser,
  	customerPlans: state.common.customerPlans,
  	businessPlans: state.common.businessPlans,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadPage: () => dispatch({ 
    		type: FEATCH_CUSTOMER_PLANS, 
    		payload: agent.common.getCusPlans() 
    	}),
	onLoadBusinessPage: () => dispatch({ 
    		type: FEATCH_BUSINESS_PLANS, 
    		payload: agent.common.getBusPlans() 
    	})
});

const MainView = (props) => {
	const { currentUser, customerPlans, onLoadPage, businessPlans, onLoadBusinessPage } = props;

	const [plans, setPlans] = useState([])
	const [nextUrl, setNextUrl] = useState([])

	useEffect(() => {
		// console.log(customerPlans)
		
		if (businessPlans && currentUser.roleId == '2') {
			setPlans(businessPlans)
		} else {
			setPlans(customerPlans)
		}
	},[customerPlans,businessPlans])

	useEffect(() => {
		if (currentUser && currentUser.roleId == '2') {
			onLoadBusinessPage()
		} else {
			onLoadPage()
		}	
	},[])

	useEffect(() => {
		if (currentUser) {
			setNextUrl('/payment/')
		}
	},[currentUser])

	let planProps = {
		plans,
		nextUrl,
	}

	return (
		<Fragment>
		    <Row className="align-items-center justify-content-center">
					<Plans {...planProps}/>
			</Row>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);