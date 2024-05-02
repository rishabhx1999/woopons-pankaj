import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form, Alert } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import business from "../../../assets/images/business-icon.png";


import { Link, useNavigate, useParams } from "react-router-dom";

import EventPopup from '../../EventPopup';

import {
  	GET_COUPON,
  	UPDATE_COUPON,
  	CLEAR_COUPON_MESSAGES
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	couponViewdata: state.user.couponViewdata,
  	currentUser: state.common.currentUser,
  	couponErr: state.user.couponErr,
  	couponSucc: state.user.couponSucc,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadCoupon: (cusid) => {
    	dispatch({ type: GET_COUPON, payload: agent.business.getCoupon(cusid) });
  	},
  	updateCoupon: (formData) => {
    	dispatch({ type: UPDATE_COUPON, payload: agent.business.updateCoupon(formData) });
  	},
  	clearMessages: () => {
        dispatch({ type: CLEAR_COUPON_MESSAGES });
    },
});

const ViewCoupon = (props) => {

	const { couponViewdata, onLoadCoupon, currentUser, updateCoupon, couponErr, clearMessages, couponSucc } = props

	const [cmpnyName , setCmpnyName] = useState('')

	const [couponName , setCouponName] = useState('')
	const [couponCode , setCouponCode] = useState('')
	const [couponOffer , setCouponOffer] = useState('')
	const [couponAbout , setCouponAbout] = useState('')
	const [couponStatus , setCouponStatus] = useState('')
	const [couponRepetition , setCouponRepetition] = useState('')

	const [checked, setChecked] = useState('');

	const [activeChecked, setActiveChecked] = useState("");
	const [pauseChecked, setPauseChecked] = useState("");
	const [pending, setPending] = useState(false);
	const [rejected, setRejected] = useState(false);

	const [ isSubscribed, setIsSubscribed] = useState(true);
	const [showToggle, setShowToggle] = useState(false);

	const [errMsg, setErrorText] = useState("");
	const [succeMsg, setSucceMsg] = useState("");

	let navigate = useNavigate();
	let params = useParams();

	const handleChange = e => {
	    e.persist();
	    let _val = e.target.value;
	    // debugger
	    if (_val == '1') {
	    	setPauseChecked('')
	    	setActiveChecked('green-btn')
	    	setChecked(1)
	    } else {
	    	setActiveChecked('')
	    	setPauseChecked('orange-btn-active')
	    	setChecked(3)
	    }

	};

	useEffect(() => {

    	if (currentUser && currentUser.roleId == '2') {
    		if (params) {
    			onLoadCoupon(params.id)

    		}
    		
    	} else {
    		navigate('/')
    	}

	}, []);

	useEffect(() => {       
		setShowToggle(false)
        if(couponErr){
        	if (typeof couponErr == 'string') {
        		setErrorText(couponErr)
        	}

            setTimeout(function(){
                clearMessages();
    			navigate('/business/coupons')
            },2000);
            
            
        }else{
        	setErrorText('')
        }
        if(couponSucc){
        	if (typeof couponSucc == 'string') {
        		setSucceMsg(couponSucc)
        	}

            setTimeout(function(){
                clearMessages();
    			navigate('/business/coupons')
            },2000);
            
            
        }else{
        	setSucceMsg('')
        }

    }, [couponSucc,couponErr]) 

	useEffect(() => {

    	if (couponViewdata) {
    		
    		if (currentUser && currentUser.roleId == '2') {
    			setCmpnyName(currentUser.name)

    			setCouponName(couponViewdata.name)
    			setCouponCode(couponViewdata.coupon_code)
    			setCouponOffer(couponViewdata.offer)
    			setCouponAbout(couponViewdata.about)
    			setCouponStatus(couponViewdata.status)
    			setCouponRepetition(couponViewdata.repetition)
    			setChecked(couponViewdata.status)
    			if (couponViewdata.status == 1 || couponViewdata.status == 4) {
    				setChecked(1)
    				setPauseChecked('')
    				setActiveChecked('green-btn')
    			} else if(couponViewdata.status == 3) {
    				setActiveChecked('')
    				setPauseChecked('orange-btn-active')
    			} else if(couponViewdata.status == 0) {
    				setRejected(true)
    			} else {
    				setPending(true)
    			}

    			if (currentUser.sub_status == 'Expired') {
	    			setRejected(true)
	    		}
    			
    			
    		}
    		
    	}

	}, [couponViewdata]);

	const submitHandle =  () => {
		setShowToggle(true);
	};

	const handleModalClose = () => setShowToggle(false);
	

    const submitAction = () => {
    	const formData = new FormData();

		formData.append("id", couponViewdata.id);
		formData.append("status", checked);

		updateCoupon(formData)
    } 

	let popupProps = {
    	showToggle,
    	handleModalClose,
    	modalMessage: 'Are you sure you want to save changes?',
    	submitAction,
    }


	return (
		<Fragment>
			<section className="inner-section coupens-sec p-50">
				<Container>  
					<Row className="mb-5 justify-content-center">
					   <Col md={12} >
					   		<div className="back-btn">
					   			<Link to="/business/coupons" className="backbtn btn btn-primary custom-button"><FaAngleLeft /> Back</Link>
					   		</div>
					   </Col>
			           <Col md={6} >
			           	{succeMsg ? <Alert variant="success">{succeMsg}</Alert> : <Fragment /> }
			           	{errMsg ? <Alert variant="danger">{errMsg}</Alert> : <Fragment /> }
			           		<div className="kfc-outer">
			           			<h3 className="mb-4">{cmpnyName}</h3>
			           			<div className="inner-kfc-content">
			           				<div className="coupens-outer">
			           					<p>Woopon name:</p>
			           					<p className="right-tags">{couponName}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<p>Woopon code:</p>
			           					<p className="right-tags">{couponCode}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<p>Use repetition:</p>
			           					<p className="right-tags">{couponRepetition}</p>
			           				</div>
			           				<div className="coupens-outer">
			           					<p>What is your offer/deal for customers?</p>
			           					<span className="right-desc">{couponOffer}</span>
			           				</div>
			           				<div className="coupens-outer">
			           					<p>About deals:</p>
			           					<span className="right-desc">{couponAbout}</span>
			           				</div>
			           			</div>
			           			{
			           				(pending && !rejected)
			           				?
			           					<div className="btns-active">
					           				<div className='btns-inner1 btns-inner2 yellow-btn'>
					           					<span>Pending</span> 
					           				</div>
					           			</div>
			           				:
			           					null
			           				}
			           			

			           			{
			           				(rejected && !pending)
			           				?
			           					<div className="btns-active">
					           				<div className='btns-inner1 btns-inner2 red-btn'>
					           					<span>Rejected</span> 
					           				</div>
					           			</div>
			           				:
			           					null
			           				}

			           			

			           			{
			           				(!pending && !rejected)
			           				?
			           					(
			           						<>
			           						<div className="btns-active">
						           				<div className={`btns-inner1 grey-btn ${activeChecked}`}>
						           					<Form.Check 
											            type="radio"
											            label="Active"
											            value="1"
												        type="radio"
												        aria-label="radio 1"
												        onChange={handleChange}
												        checked={checked == 1}
											          />
						           					
						           				</div>
						           				<div className={`btns-inner1 grey-btn ${pauseChecked}`}>
						           					<Form.Check
											            type="radio"
											            label="Pause"
											            value="0"
												        type="radio"
												        aria-label="radio 1"
												        onChange={handleChange}
												        checked={checked == 3}
											          />
						           					
						           				</div>
						           			</div>
						           			<div className="main-btn-outer">
						           				<Button 
						           					onClick={submitHandle}
						           				 	className="custom-button w-100 btn btn-md btn-primary">Save changes</Button>
						           			</div>
						           			</>
			           					)
			           				:
			           					null
			           				}
			           			
			           		</div>
			           </Col>
			        </Row>
			        <EventPopup {...popupProps} />
			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCoupon);