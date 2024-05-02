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
  	FEATCH_BUSINESS_PLANS,
  	FEATCH_CUSTOMER_PLANS
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	currentUser: state.common.currentUser,
  	businessPlans: state.common.businessPlans,
  	customerPlans: state.common.customerPlans,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadPage: () => dispatch({ 
    		type: FEATCH_BUSINESS_PLANS, 
    		payload: agent.common.getBusPlans() 
    	}),
	onLoadPageCus: () => dispatch({ 
    		type: FEATCH_CUSTOMER_PLANS, 
    		payload: agent.common.getCusPlans() 
    	}),
});

const MainView = (props) => {
	const { currentUser, businessPlans, onLoadPage, onLoadPageCus, customerPlans, breakpoint = 640 } = props;

	const [plans, setPlans] = useState([])
	const [cusPlans, setCusPlans] = useState([])
	const [nextUrl, setNextUrl] = useState([])
	const [nextUrlCus, setNextUrlCus] = useState([])

	const checkForDevice = () => window.innerWidth < breakpoint;

  	const [isMobile, setIsMobile] = useState(checkForDevice());

	useEffect(() => {
		// console.log(customerPlans)
		setCusPlans(customerPlans)
		setPlans(businessPlans)
	},[businessPlans,customerPlans])

	useEffect(() => {
		onLoadPage()
		onLoadPageCus()

		const handlePageResized = () => {
      		setIsMobile(checkForDevice());
	    };

	    if (typeof window !== 'undefined') {
	      window.addEventListener('resize', handlePageResized);
	      window.addEventListener('orientationchange', handlePageResized);
	      window.addEventListener('load', handlePageResized);
	      window.addEventListener('reload', handlePageResized);
	    }

	    return () => {
	      if (typeof window !== 'undefined') {
	        window.removeEventListener('resize', handlePageResized);
	        window.removeEventListener('orientationchange', handlePageResized);
	        window.removeEventListener('load', handlePageResized);
	        window.removeEventListener('reload', handlePageResized);
	      }
	    };
	},[])

	useEffect(() => {
		if (currentUser) {
			setNextUrl('/payment/')
		} else {
			setNextUrl('/business/create/')
		}

		if (currentUser && currentUser.roleId == 3) {
			if (currentUser.email_verified) {
				setNextUrlCus('/payment/')
			} else {
				setNextUrlCus('/customer/enterotp/')
			}
			
		} else if(currentUser && currentUser.roleId == 2) {
			setNextUrlCus('/business/plans')
		} else {
			setNextUrlCus('/customer/create/')
		}

	},[currentUser])

	let planProps = {
		plans,
		nextUrl,
		right: false,
		headertext: 'For Businesses',
		buttonText: 'Get Started With A 90 DAY FREE TRAIL, No Stings Attached!',
	}

	let cusPlanProps = {
		plans: cusPlans,
		nextUrl: nextUrlCus,
		right: true,
		headertext: 'For Customers',
		buttonText: 'Get Started With A 7 DAY FREE TRAIL, No Stings Attached!',
	}

	return (
		<Fragment>
			<div id="plans" className="video-price-sec">
				<div class="price-with-video">
					<Plans {...cusPlanProps}/>
				</div>
				{(!isMobile)
						?
							<video id='banner-video' className="video-full" width="100%" height="500" src={video1} type="video/mp4" loop autoPlay={true} muted="muted">
                		 	</video>
						: null
						}
				
			</div>
			<div id="plans" className="video-price-sec">
				<div class="price-with-video">
					<Plans {...planProps}/>
				</div>
				{(!isMobile)
						?
							<video id='banner-video' className="video-full" width="100%" height="500" src={video1} type="video/mp4" loop autoPlay={true} muted="muted">
                 			</video>
						: null
						}
				
			</div>
			
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);