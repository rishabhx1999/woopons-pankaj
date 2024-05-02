import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose, AiOutlineInstagram, AiOutlineTwitter, AiFillQuestionCircle } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaLinkedinIn } from 'react-icons/fa';
import footerlogo from "../../../../../public/images/black-logo.png";
import Accordion from 'react-bootstrap/Accordion';
import features1 from "../../../assets/images/features1.png";
import iphone11 from "../../../assets/images/iphone11.png";
import { TiTick } from 'react-icons/ti';
import Plans from '../Plans';

const video1 = "/images/video1.mp4";

import {
  	FEATCH_BUSINESS_PLANS,
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	currentUser: state.common.currentUser,
  	businessPlans: state.common.businessPlans,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadPage: () => dispatch({ 
    		type: FEATCH_BUSINESS_PLANS, 
    		payload: agent.common.getBusPlans() 
    	}),
});

const MainView = (props) => {
	

	return (
		<Fragment>
			<section className="business-top-sec">
				<Container>
			      <Row className="align-items-center">
			        <Col md={6}>
			        	<div className="title-business-left">
				        	<ul>
				        	<li>Do you want to save money on local deals?</li>
				        	<li>Do you love supporting local businesses in Worcester County?</li>
				        	</ul>
			        		<p><i>Get ready Worcester County…</i></p>
			        		<p className="text-white">Introducing Woo-Pons… </p>
			        		<p className="text-white">We're excited to announce the pre-launch of a new APP that will help you save money on every purchase you make.</p>
			        		<p className="text-white">…and we want YOU to be the first to know about it because this one-of-a-kind mobile APP will offer deals, discounts, and incentives at some of the best local businesses all throughout Worcester County. </p>
			        		<div className="title-business-top">
			        		<h3 className="text-white">EXCLUSIVE PARTNERSHIP WITH LOCAL BUSINESSES</h3>
			        		<p className="text-white">We’re partnering up with Worcester County business owners to offer <b>EXCLUSIVE</b> coupons, deals, discounts, and freebies that you won't find anywhere else.</p>
			        		<p className="text-white">From restaurants to entertainment to shopping, spas and more, our app is your ticket to savings at hundreds of local businesses in Worcester County—and it's growing every single day.</p>
			        		<p className="text-white">So with these coupons in hand, you'll be able to enjoy everything from $10 off an order at your favorite restaurant to 50% off a massage from your favorite masseuse. </p>
			        		<p className="text-white">Pretty cool, right?</p>
			        	</div>
			        	</div>
			        </Col>
			        <Col md={6}>
			        	<div className="title-business-img text-center">
			        		<Image src={iphone11} />
			        	</div>
			        </Col>
			      </Row>
			    </Container>
			</section>
			<section className="about-content1 about-content2">
				<Container>
			      <Row>
			        <Col md={4}>
			        	<div className="abouthome-content text-center">
			        		<div className="about-inner-boxes">
			        			<h2 className="text-white">NO MORE OUTDATED COUPONS</h2>
					        		<div className="">
					        			<p>We're all about keeping things fresh.</p>
					        			<p>We understand how frustrating it can be to get a coupon for something that doesn't exist anymore.</p>
					        			<p>That's why our app is always updated with the latest deals from your favorite local businesses—so you'll never have to waste time hunting down outdated coupons again.</p>
					        		</div>
			        		</div>
			        	</div>
			    	</Col>
			    	<Col md={4}>
			        	<div className="abouthome-content text-center">
			        		<div className="about-inner-boxes">
			        			<h2 className="text-white">SLEEK & INTERACTIVE</h2>
					        		<div className="">
					        			<p>Our app is a fun and interactive way to enjoy everything that Worcester County has to offer. </p>
					        			<p>We've made sure it's super easy to browse through all of the deals we have available.</p>
					        			<p>It's easy to navigate between categories and choose the ones you’re interested in—<i>fast! You can even keep track of your favorites! </i></p>
					        			<p>It's simple, too:<i> Just sign up for your free trial,  download the app, receive valuable local deals, and redeem them in a snap.
 </i></p>
					        		</div>
			        		</div>
			        	</div>
			    	</Col>
			    	<Col md={4}>
			        	<div className="abouthome-content text-center">
			        		<div className="about-inner-boxes">
			        			<h2 className="text-white">SUPPORT LOCAL BUSINESSES</h2>
					        		<div className="">
					        			<p>Woo-Pons is a great way for you to support local businesses— <i>while also saving money. </i> </p>
					        			<p>By using this app, you’re helping your favorite local businesses stay in business and enjoy the best of Worcester County’s unique offerings. add something different here amazing prices. </p>
					        		</div>
			        		</div>
			        	</div>
			    	</Col>
			      </Row>
			    </Container>
			</section>
			
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);