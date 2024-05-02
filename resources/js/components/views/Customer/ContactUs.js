import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import googlepay from "../../../assets/images/google-pay.png";
import appstore from "../../../assets/images/app-store.png";
import hand from "../../../assets/images/hand.png";

import style from "./style.scss";
import Loader from "../../Loader";

import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate, Link } from "react-router-dom";

const ContactUs = (props) => {
	const [pageLoaded, setPageLoaded] = useState(true)
	// proper initialization
	if( 'function' === typeof importScripts) {
	   importScripts("https://api.leadconnectorhq.com/js/form_embed.js") 
	}
	const handleIfrmeLoad = () => {
		console.log('loader iframe') 
		setPageLoaded(false) 
	}
	return (
		<Fragment>
			{pageLoaded ? (
				<Loader />
				) : (
				null
    		)}
			<div className="dashboard-page inner-page details-main-sec">
				<section className="profile-main-sec">
					<Container>
						<iframe src="https://api.leadconnectorhq.com/widget/form/oJn1N2JMuKaNlkQYqXHr" height={660} width="100%" scrolling="no" id="oJn1N2JMuKaNlkQYqXHr" onLoad={handleIfrmeLoad}>
						</iframe>

				    </Container>
				</section>
			</div>
		</Fragment>
	);
}

export default ContactUs;