import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose, AiOutlineInstagram, AiOutlineTwitter, AiFillQuestionCircle } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaLinkedinIn } from 'react-icons/fa';
import footerlogo from "../../../../../public/images/footer-logo.png";
import Accordion from 'react-bootstrap/Accordion';
import features1 from "../../../assets/images/features1.png";
import mobile1 from "../../../assets/images/mobile1.png";
import leftimg from "../../../assets/images/left-img.png";
import rightimg from "../../../assets/images/right-img.png";
import leftmob from "../../../assets/images/left-mob.png";
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
	const { currentUser, businessPlans, onLoadPage, breakpoint = 640 } = props;

	const [plans, setPlans] = useState([])
	const [nextUrl, setNextUrl] = useState([])

	const [searchParams]  = useSearchParams();

	const checkForDevice = () => window.innerWidth < breakpoint;

  	const [isMobile, setIsMobile] = useState(checkForDevice());

  	const goToElement = (elm) => {
  		const element = document.getElementById(elm);
		if (element) {
			element.scrollIntoView({behavior: 'smooth'});
		}
  	}

  	const goToPlanElement = () => {
  		const element = document.getElementById('plans');
		if (element) {
			element.scrollIntoView({behavior: 'smooth'});
		}
  	}

  	useEffect(() => {
	    const currentParams = Object.fromEntries([...searchParams]);
	    console.log(currentParams); // get new values onchange
	    if (currentParams && currentParams.element) {
			goToElement(currentParams.element)
		}
		if (currentParams && currentParams.access_token) {
			let formData = {token:currentParams.access_token};
			loginFromToken(formData)	
			
		}
	}, [searchParams]);

	useEffect(() => {
		// console.log(customerPlans)
		setPlans(businessPlans)
	},[businessPlans])

	useEffect(() => {
		onLoadPage()

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
		if(currentUser && currentUser.roleId == 3) {
			setNextUrl('/home?element=plans')
		} else if (currentUser && currentUser.roleId == 2) {
			setNextUrl('/')
		} else {
			setNextUrl('/business/create/')
		}

	},[currentUser])

	let planProps = {
		plans,
		nextUrl,
		right: true,
		headertext: 'Select your plan',
		buttonText: 'Get Started With A 90 DAY FREE TRAIL, No Stings Attached!',
		type: 'business'
	}

	return (
		<Fragment>
			<div>
				<section className="home-banner">
					<Container>
				      <Row>
				        <Col>
				        	<div className="banner-content">
				        		<h2 className="text-white">DOES YOUR LOCAL BUSINESS NEED <span>MORE CUSTOMERS?</span></h2>
				        	</div>
				    	</Col>
				      </Row>
				      <Row>
				        <Col md={6}>
				        	<div className="homebanner-content">
				        		<h2 className="text-white">Do you remember the days when customers<br /> used to cut coupons from the local newspapers<br /> or even get them from those old coupon books?</h2>
				        		<h3 className="outdated-txt">SO OUTDATED</h3>
				        		<p>What if there was a more modernized way of doing things<br /> <span className="red-txt">(like a mobile app)</span> that allows potential customers to explore<br /> the available "deals, discounts & incentives" that local<br /> businesses are offering...</p>
				        		<p>A way to bring in NEW customers on a daily basis by offering<br /> a simple, yet exclusive discount to incentivize local patrons to<br /> try out a new local business..</p>
				        		<p>What If there was a platform that catered to Worcester County<br /> <span className="red-txt">exclusively</span> to entice potential customers to try <span className="red-txt">YOUR BUSINESS</span></p>
				        		<h3 className="noneed-txt">“No Need To Dream Anymore”</h3>
				        	</div>
				    	</Col>
				    	<Col md={6}>
				        	<div className="homebanner-img">
				        		<Image src={mobile1} />
				        	</div>
				    	</Col>
				      </Row>
				      <Row>
				        <Col md={12}>
				        	<div className="interduce-content">
				        		<h2 className="red-txt text-center">INTRODUCING WOO-PONS!</h2>
				        		<p className="text-center text-white mt-4 mb-5">The best way for local businesses to connect customers through exciting offers. <br />It's easy, it's simple and it helps your business keep up with the Joneses!</p>
				        		<div className="btn-yellow-outer">
				        			<Link onClick={goToPlanElement}>SIGN UP COMPLETELY FREE <span>(LIMITED SPOTS AVAILABLE)</span></Link>
				        		</div>
				        	</div>
				    	</Col>
				      </Row>
				    </Container>
				</section>

				<section className="full-img-banner">
					<Container fluid>
				      <Row>
				      	<Col md={6} className="paddleft-0">
				        	<div className="homebanner-img">
				        		<Image src={leftimg} />
				        	</div>
				    	</Col>
				        <Col md={6}>
				        	<div className="homebanner-content">
				        		<h2 className="">WOO-PONS is going to change how you interact <br />with your customers, how you market yourself <br />
and how you do business in Worcester County.</h2>
							<p>You can't afford to not be part of this new way <br />of doing things which is all about a highly <br />targeted audience, localized content, and a<br /> <span className="yellow-txt">FREE</span> advertising model that lets you promote <br /> your business to <span className="red-txt">WORCESTER COUNTY RESIDENTS</span></p>
				        	</div>
				    	</Col>
				    	
				      </Row>
				      <Row className="pt-100">
				      	<Col md={6}>
				        	<div className="homebanner-content homebanner-content2">
				        		<h2 className="">BRING EXCELLENT<br /> CONVERSION & INCREASED <br />REVENUE</h2>
							<p>We help local businesses get more customers by providing <br />mobile app that allows you to offer your customers an <br /> experience they can't get anywhere else.</p>
				        	</div>
				    	</Col>
				    	<Col md={6} className="paddright-0">
				        	<div className="homebanner-img">
				        		<Image src={rightimg} />
				        	</div>
				    	</Col>
				      </Row>
				    </Container>
				</section>

				<section className="full-img-banner2">
					<Container fluid>
				      <Row>
				        <Col md={6} className="paddleft-0">
				        	<div className="homebanner-img">
				        		<Image src={leftmob} />
				        	</div>
				    	</Col>
				    	<Col md={6}>
				        	<div className="rightimg-txt">
				        		<p className="discounttxt">You can use them to offer discounts on products or <br /> services, or you can even offer freebies as part of your<br /> WOO-PON strategy!</p>
				        		<h3>The Best Part Is That You Can <br />Use WOO-PONS To:</h3>
				        		<ul>
				        			<li>Increase your revenue</li>
				        			<li>Build loyalty</li>
				        			<li>Strengthen your brand image</li>
				        			<li>Increase customer engagement</li>
				        		</ul>
				        		<p className="way-txt">A way to attract new customers to your business on a daily <br /> basis without spending a ton of money on advertising</p>
				        		<div className="btn-yellow-outer">
				        			<Link onClick={goToPlanElement}>SIGN UP NOW <span>FOR FREE</span></Link>
				        		</div>
				        	</div>
				    	</Col>
				      </Row>
				    </Container>
				</section>

				<section className="interduce-sec">
					<Container>
				      <Row>
				        <Col md={6}>
				        	<div className="interduce-left">
				        		<ul>
				        			<li>As a Founding Member, you'll get to use our platform <br />COMPLETELY FREE!</li>
				        			<li>If you want to save big… well, now’s the time.</li>
				        			<li>This is a one-time opportunity that will never be <br />offered again and we're only taking 100 businesses<br /> for <span className="red-txt">FREE</span> into this program.</li>
				        		</ul>
				        		<div className="btn-yellow-outer">
				        			<Link onClick={goToPlanElement}>JOIN THE WOO-PON FAMILY <span>(WHAT ARE YOU WAITING FOR?)</span></Link>
				        			<p className="once-txt text-center">Once we have 100 businesses signed up, we will close the <br />FREE program immediately. This is a rare opportunity to be <br /> a part of something exclusive—but only for a limited time.</p>
				        		</div>
				        	</div>
				    	</Col>
				    	<Col md={6}>
				        	<div className="interduce-right">
				        		<h3>INTRODUCING...</h3>
				        		<h2><span className="yellow-txt leftspan">THE</span>FOUNDING MEMBERS <span className="yellow-txt rightspan">PROGRAM</span></h2>
				        	</div>
				    	</Col>
				      </Row>
				    </Container>
				</section>


				<section className="founding-sec">
					<Container>
				      <Row>
				        <Col md={12}>
				        	<div className="title-main text-center">
				        		<h2>FOUNDING MEMBERS!</h2>
				        	</div>
				    	</Col>
				      </Row>
				    </Container>
				</section>
				
				<Plans {...planProps} />

				<section className="early-sec">
					<Container>
				      <Row>
				        <Col md={12}>
				        	<div className="title-main text-center">
				        		<p>Get In Early And Take Advantage Of Our NEW Marketing System!</p>
				        		<div className="btn-yellow-outer">
				        			<Link onClick={goToPlanElement}>I'M READY TO JOIN! <span>(FREE LIMITED SPOTS AVAILABLE)</span></Link>
				        		</div>
				        	</div>
				    	</Col>
				      </Row>
				    </Container>
				</section>

				

				<section className="faq-section p-50">
					<Container>
				      <Row>
				        <Col md={12}>
				        	<div className="main-title mb-5">
				        		<h2 className="text-center">Frequently Asked Questions</h2>
				        	</div>
				        	<div className="faq-outer">
				        		<Accordion defaultActiveKey="0">
							      <Accordion.Item eventKey="4">
							        <Accordion.Header>Is this a yearly contract & are you running any special promotions?</Accordion.Header>
							        <Accordion.Body>
							          We have different plans available, however, they’re generally month to month and give you the opportunity to “try before you buy” with our legendary 3-month FREE TRIAL for a limited time only! By choosing a month-to-month plan, you’re never locked in with us. And if for any reason you don’t want to continue working with us, simply pause or cancel your account before your billing date.

							        </Accordion.Body>
							      </Accordion.Item>
							      <Accordion.Item eventKey="5">
							        <Accordion.Header>How many Woo-Pon promotions can I run at one time & what if I change my mind and no longer want to offer that deal?</Accordion.Header>
							        <Accordion.Body>
							          We currently offer two (2) packages to choose from. <br />
										Our Bronze plan offers you to put one (1) offer “live” on our mobile app at any given time. <br />
										While our Silver Plan offers your business the ability to provide up to three (3) deals “live” on our app at any given time. <br />
										These can be changed at any time, however, all Woo-Pons are subject to approval before going “live”<br />
										Logging into your dashboard, you’ll have the ability to simply pause your Woo-Pons & your offers will not display on our mobile app until you resume your offer again.
									</Accordion.Body>
							      </Accordion.Item>
							      <Accordion.Item eventKey="6">
							        <Accordion.Header>What if I want customers to be able to use my deal unlimited times, can we do this?</Accordion.Header>
							        <Accordion.Body>
							          Yes! When generating your Woo-Pon, you’ll have the ability to click 1x use or Unlimited. If you click 1x use, once a patron comes in & uses their Woo-Pons at your establishment, It will disappear from their search options and not allow use of this anymore unless you run a similar Woo-Pon. If you choose unlimited usage, patrons can use this for as long as your offer is active.
									</Accordion.Body>
							      </Accordion.Item>
							      <Accordion.Item eventKey="7">
							        <Accordion.Header>How does It work? Do my waiters & waitresses need to scan anything?</Accordion.Header>
							        <Accordion.Body>
							          No scanning necessary. A Customer may only activate a Woo-Pon inside your establishment. The Woo-Pon will stay open for 60 seconds, after 60 seconds that Woo-Pon will expire. All customers are advised to only redeem their Woo-Pon at checkout in front of a staff member for redemption.
									</Accordion.Body>
							      </Accordion.Item>
							      <Accordion.Item eventKey="8">
							        <Accordion.Header>What is your favorite dessert?</Accordion.Header>
							        <Accordion.Body>
							          That’s a strange question, but, if you must know, we are huge fans of the Italian dessert known as Tiramisu.
									</Accordion.Body>
							      </Accordion.Item>
							    </Accordion>
				        	</div>
				        </Col>
				      </Row>
				    </Container>
					
				</section>

				
			</div>

		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);