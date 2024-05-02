import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form, Alert } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import eventimg1 from "../../../assets/images/eventimg1.png";
import './style.scss';

import { Link, useParams, useNavigate } from "react-router-dom";


import {
  	GET_COUPON_ADMIN,
  	UPDATE_COUPON_ADMIN,
  	CLEAR_COUPON_MESSAGE,
  	PAGE_ATTR
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	coupondata: state.admin.coupondata,
  	errorMsg: state.admin.errorMsg,
  	currentUser: state.common.currentUser,
  	couponASucc: state.admin.couponASucc,
  	couponAErr: state.admin.couponAErr,

});

const mapDispatchToProps = (dispatch) => ({
	onLoadCoupon: (cusid) => {
    	dispatch({ type: GET_COUPON_ADMIN, payload: agent.admin.getCoupon(cusid) });
  	},
  	updateCoupon: (formData) => {
    	dispatch({ type: UPDATE_COUPON_ADMIN, payload: agent.admin.updateCoupon(formData) });
  	},
  	clearMesages: () => {
  		dispatch({ type: CLEAR_COUPON_MESSAGE })
  	},
  	setPageHeading: (title) => {
        dispatch({ type: PAGE_ATTR, pageheading: title });
    }
});

const CouponView = (props) => {

	const { currentUser, coupondata, onLoadCoupon, errorMsg, updateCoupon, couponASucc, clearMesages, setPageHeading, pageheading,couponAErr } = props;

	const [couponName , setCouponName] = useState('')
	const [couponCode , setCouponCode] = useState('')
	const [couponOffer , setCouponOffer] = useState('')
	const [couponAbout , setCouponAbout] = useState('')
	const [couponStatus , setCouponStatus] = useState('')
	const [couponRepetition , setCouponRepetition] = useState('')

	const [cmpnyImage , setCmpnyImage] = useState('/images/user-main.png')
	const [succeMsg , setSuccessMsg] = useState('')
	const [errMsg , setErrMsg] = useState('')

	let params = useParams();
	let navigate = useNavigate();

	const submitAccept =  () => {
		const formData = new FormData();

		formData.append("id", coupondata.id);
		formData.append("status", 1);

		updateCoupon(formData)
		// setSuccessMsg(true)
		setTimeout(function() {
			clearMesages()
			navigate('/admin/coupons')
		}, 5000);
	};

	useEffect(() => {  		
		if(couponASucc){
            setSuccessMsg(couponASucc);
		}else{
			setSuccessMsg("");
		}
		if(couponAErr){
            setErrMsg(couponAErr);
		}else{
			setErrMsg("");
		}
  		
  	}, [couponAErr,couponASucc])

	const submitReject =  () => {
		const formData = new FormData();

		formData.append("id", coupondata.id);
		formData.append("status", 0);

		updateCoupon(formData)
		// setSuccessMsg(true)
		setTimeout(function() {
			clearMesages()
			navigate('/admin/coupons')
		}, 5000);
	};

	useEffect(() => {

		if (params) {
			onLoadCoupon(params.id)
		}

	}, []);

	useEffect(() => {  		
		if(pageheading){
            setPageHeading(pageheading);
		}else{
			setPageHeading("WOO-PONS");
		}
  		
  	}, [pageheading])

	useEffect(() => {

    	if (coupondata) {

			setCouponName(coupondata.name)
			setCouponCode(coupondata.coupon_code)
			setCouponOffer(coupondata.offer)
			setCouponAbout(coupondata.about)
			setCouponStatus(coupondata.status)
			setCouponRepetition(coupondata.repetition)

			if (currentUser && currentUser.avatar) {
				setCmpnyImage(currentUser.avatar)
			}
    		
    	}

	}, [coupondata]);


	return (
		<Fragment>
			<section className="dashboard-section coupon-detail-sec">
				<Container fluid>  
			      	<div className="shadow-box">
			      		<Row className="mb-5">
				           <Col md={12}>
				           		<p className="user-title"> <Link to="/admin/coupons" className="backbtn"><FaAngleLeft /> {couponName}</Link></p>
				           	</Col>
				        </Row>
				        {succeMsg ? <Alert variant="success">Coupon Updated Successfully</Alert> : <Fragment /> }
				        {errMsg ? <Alert variant="danger">{errMsg}</Alert> : <Fragment /> }
				        <Row className="">
				           <Col md={4}>
				           		<div className="left-img-coupon">
				           			<Image src={cmpnyImage} />
				           		</div>
				           	</Col>
				           	<Col md={6}>
				           		<div className="right-info-coupon">
				           			<div className="coupens-outer">
			           					<h4>WOO-PON Name :</h4>
			           					<p className="right-tags">{couponName}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>WOO-PON Code :</h4>
			           					<p className="right-tags">{couponCode}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>What is offer/deal :</h4>
			           					<p className="right-tags">{couponOffer}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<h4>Use time :</h4>
			           					<p className="right-tags">{couponRepetition}</p>
			           				</div>
				           		</div>
				           	</Col>
				        </Row>
				        <Row className="mt-5">
				           <Col md={12}>
				           		<div className="about-deal">
				           			<h4>About deal</h4>
				           			<p>{couponAbout}</p>
				           		</div>
				           		<div className="accept-reject-btns mt-5 d-flex justify-content-center">
				           			<Button onClick={submitAccept} className="custom-button btn btn-md yellow-btn">Accept</Button>
							        <Button onClick={submitReject} className="custom-button btn btn-md grey-btn">Reject</Button>
				           		</div>
				           	</Col>
				        </Row>
					</div>

			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponView);