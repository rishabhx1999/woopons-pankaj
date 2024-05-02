import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import business from "../../../assets/images/business-icon.png";


import { Link, useNavigate } from "react-router-dom";

import Table from '../Table';


import {
  	BUSSINESS_ALL_COUPONS,
  	DELETE_COUPON
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	allCoupons: state.user.allCoupons,
  	currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadCoupons: () => {
    	dispatch({ type: BUSSINESS_ALL_COUPONS, payload: agent.business.getCoupons() });
  	},
  	onDeleteCoupons: (formData) => {
    	dispatch({ type: DELETE_COUPON, payload: agent.business.deleteCoupon(formData) });
  	},
});

const ListCoupons = (props) => {

	const { allCoupons, onLoadCoupons, currentUser, onDeleteCoupons } = props
	const [ Lists, setLists] = useState({});
	const [ isSubscribed, setIsSubscribed] = useState(true);
	const [ deleteCoupon, setDeleteCoupon] = useState(null);

	const [showToggle, setShowToggle] = useState(false);

	let navigate = useNavigate();

	const submitAction = () => {
    	const formData = new FormData();

		formData.append("id", deleteCoupon);

		onDeleteCoupons(formData)
    } 

	useEffect(() => {

    	if (currentUser && currentUser.roleId == '2') {
    		onLoadCoupons()
    		if (currentUser.sub_status == 'Expired') {
    			setIsSubscribed(false)
    		}
    	} else {
    		navigate('/')
    	}

	}, []);

	useEffect(()=>{
		if (allCoupons) {
			setDeleteCoupon(null)
			setShowToggle(false)
			setLists(allCoupons)
			
		}
		
	},[allCoupons])

    let tableProps = {
    	Lists,
    	submitAction,
    	setDeleteCoupon,
    	showToggle, 
    	setShowToggle
    }

	return (
		<Fragment>
			<section className="inner-section p-50 coupon-list-sec">
				<Container>  
					<Row className="">
			           <Col md={6}>
			           		<div className="coupon-card">
			           			<h2>My WOO-PONS!</h2>
			           		</div>
			           	</Col>
			           <Col md={6} className="text-right">
			           	{ isSubscribed ?
			           		<Link to="/business/coupon/create" className="custom-btn btn-primary red-btn">Create A New WOO-PON</Link>
			           		:
			           		 null
			           	}
			           	
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

export default connect(mapStateToProps, mapDispatchToProps)(ListCoupons);