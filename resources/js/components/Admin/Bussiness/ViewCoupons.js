import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form, Alert, Modal } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import eventimg1 from "../../../assets/images/eventimg1.png";
import './style.scss';

import { Link, useParams, useNavigate } from "react-router-dom";
import {getBackgroundColor,createImageFromInitials} from '../../Utils'

import Table from './Table';

import {
  	GET_COUPONS_BY_BUSINESS_ID,
  	CLEAR_ADMIN_MESSAGE
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	couponData: state.admin.couponData,
  	businessName: state.admin.businessName,
  	errorMsg: state.admin.errorMsg,
  	currentUser: state.common.currentUser,
  	businessASucc: state.admin.businessASucc,

});

const mapDispatchToProps = (dispatch) => ({
	getCouponsByBusinessId: (busid) => {
    	dispatch({ type: GET_COUPONS_BY_BUSINESS_ID, payload: agent.admin.getCouponsByBusinessId(busid) });
  	},
  	clearMesages: () => {
  		dispatch({ type: CLEAR_ADMIN_MESSAGE })
  	}
});

const ViewBusiness = (props) => {

	const { currentUser,getCouponsByBusinessId,couponData, businessName, clearMesages } = props;

	let params = useParams();
	let business_id = null;
	if (params.id) {
		business_id = params.id;
	}

	const [ Lists, setLists] = useState({});


	useEffect(() => {
		if(business_id){
    	   getCouponsByBusinessId(business_id)
    	}
	}, [business_id]);

	useEffect(() => {
		if(couponData){
    	   setLists(couponData)
    	}
	}, [couponData]);

	

	let tableProps = {
    	Lists
    }


	return (
		<Fragment>
			<section className="inner-section p-50 coupon-list-sec">
				<Container>  
					<Row className="">
			           <Col md={6}>
			           		<div className="coupon-card">
			           		    {(businessName)? 
			           		    	<p className="user-title"> <Link to="/admin/bussinesses" className="backbtn"><FaAngleLeft /> {businessName}</Link></p>
			           			:''}
			           		</div>
			           	</Col>
			        </Row>
			      	<div className="table-coupon">
			      		<Table {...tableProps} />
			      	</div>

			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBusiness);