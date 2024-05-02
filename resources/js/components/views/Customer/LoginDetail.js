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

import {
  	GET_CUSTOMER_LOG_DETAIL
} from "../../../constants/actionTypes";

import style from "./style.scss";

import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate, Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  	...state,
  	customerUser: state.common.customerUser,
  	currentUser: state.common.currentUser,
  	logDetail: state.user.logDetail,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadDetail: () => {
    	dispatch({ type: GET_CUSTOMER_LOG_DETAIL, payload: agent.customer.getLogDetail() });
  	}
});

const LoginDetail = (props) => {
	

	const { currentUser,customerUser,onLoadDetail,logDetail } = props;

	let navigate = useNavigate();
 	const [email,setEmail] = useState("")
 	const [password,setPassword] = useState("")

 	useEffect(()=>{
 		if (currentUser && currentUser.roleId == 3) {
 			onLoadDetail()
 		}
 	},[currentUser])

 	useEffect(()=>{
 		if (logDetail && logDetail.email) {
 			setEmail(logDetail.email)
 			setPassword(logDetail.password)
 		}
 	},[logDetail])

	return (
		<Fragment>
			<div className="dashboard-page inner-page details-main-sec">
				<section className="profile-main-sec">
					<Container>
						<Row className="justify-content-center">
							<Col lg={6}>
								<div className="detial-outer">
									<h2>Login details</h2>
									<div className="detial-outer-box">
										<p>Username: {email}</p>
										<p>Password:  {password}</p>
									</div>
								</div>
							</Col>
							<Col lg={6}>
								<div className="detial-outer text-center">
									<h2>Download our app now</h2>
									<div className="detial-outer-images">
										<Link to="#"><Image src={googlepay} /></Link>
										<Link to="#"><Image src={appstore} /></Link>
									</div>
								</div>
							</Col>
				      	</Row>
				    </Container>
				    <Image className="hand-img" src={hand} />
				</section>
			</div>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDetail);