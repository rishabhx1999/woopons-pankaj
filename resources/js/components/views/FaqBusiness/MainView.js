import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaLinkedinIn } from 'react-icons/fa';

import { TiTick } from 'react-icons/ti';

import Accordion from 'react-bootstrap/Accordion';

const mapStateToProps = (state) => ({
  	...state,
});

const mapDispatchToProps = (dispatch) => ({});

const MainView = (props) => {
	

	return (
		<Fragment>
			<div>
				<section className="faq-section p-50">
					<Container>
				      <Row>
				        <Col md={12}>
				        	<div className="main-title mb-5">
				        		<h2 className="text-center">FAQ For Business</h2>
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