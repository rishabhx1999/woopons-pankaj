import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";

import {getBackgroundColor,createImageFromInitials} from '../../Utils'

import { Link } from "react-router-dom";


import {
  	ADMIN_COUPONS_DATA,
  	UPDATE_COUPON_ADMIN,
  	CLEAR_COUPON_MESSAGE
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	coupondata: state.admin.coupondata,
  	errorMsg: state.admin.errorMsg,
  	couponASucc: state.admin.couponASucc,

});

const mapDispatchToProps = (dispatch) => ({
	onLoadPage: () => dispatch({ 
    		type: ADMIN_COUPONS_DATA, 
    		payload: agent.admin.getAllCoupons() 
    	}),
	updateCoupon: (formData) => {
    	dispatch({ type: UPDATE_COUPON_ADMIN, payload: agent.admin.updateCoupon(formData) });
  	},
  	clearMesages: () => {
  		dispatch({ type: CLEAR_COUPON_MESSAGE })
  	}
});

const MainView = (props) => {

	const { currentUser, coupondata, onLoadPage, errorMsg, updateCoupon, couponASucc, clearMesages } = props;

	const [coupons, setCoupons] = useState([])

	const handleStatus =  (cId,status) => {
		const formData = new FormData();

		formData.append("id", cId);
		formData.append("status", status);

		updateCoupon(formData)
		
	};

	useEffect(()=> {
		if (couponASucc) {

			onLoadPage()
			clearMesages()
		}
	},[couponASucc])

	useEffect(()=> {
		if (coupondata) {
			setCoupons(coupondata)
		}
	},[coupondata])

	useEffect(()=> {
		onLoadPage()
	},[])

	return (
		<Fragment>
			<section className="dashboard-section">
				<Container fluid>  
			      	<div className="shadow-box">
			      		<Row className="mb-5">
				           <Col md={6}>
				           		<p className="user-title"> Requests</p>
				           	</Col>
				           <Col md={6} className="text-right">
				           	{/* <a className="simple-btn">View All</a>	 */}
				           	
				           </Col>
				        </Row>

				        {
				        	(coupons && coupons.length > 0)
				        	?
				        		coupons.map((coupon,index)=>(

				        			<Fragment key={index}>
					        		<Row key={index} className="align-items-center">
							           <Col md={1}>
							           		<Image style={{borderRadius: '50px'}} src={ coupon.company_logo ? coupon.company_logo : createImageFromInitials(200, coupon.company_name, getBackgroundColor())} />
							           	</Col>
							           <Col key={index} md={8}>
							           		<div className="chat-details">
							           			<Link key={index} to={`/admin/view/coupon/${coupon.id}`}>{coupon.name}<span className="bold-business"> {`( Business: ${coupon.company_name} )`}</span></Link>
							           		</div>				           	
							           </Col>
							           <Col md={3}>
							           		<div className="accept-reject-btns d-flex justify-content-end">
							           			<Button onClick={()=> handleStatus(coupon.id,1)} className="custom-button btn btn-md yellow-btn">Accept</Button>
							           			<Button onClick={() => handleStatus(coupon.id,0)} className="custom-button btn btn-md grey-btn">Reject</Button>
							           		</div>
							           	</Col>
							        </Row>

							        <hr />
							       </Fragment>
						    	))
				        	:
				        	<>
				        		<Row className="">
						           <Col md={12}>
						           		<p>No Data</p>
						           	</Col>
						        </Row>

						        <hr />
						    </>
				        }
				        

			      	</div>

			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);