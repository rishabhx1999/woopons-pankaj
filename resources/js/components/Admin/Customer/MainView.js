import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import users from "../../../assets/images/users.png";
import business from "../../../assets/images/business-icon.png";


import { Link } from "react-router-dom";

import Table from '../Table';


import {
  	ALL_CUSTOMER_DATA,
  	CANCEL_CUS_SUBSCRIPTION
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	allCustomers: state.admin.allCustomers,
  	subscriptionsCounts: state.admin.subscriptionsCounts,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadCustomers: () => {
    	dispatch({ type: ALL_CUSTOMER_DATA, payload: agent.admin.getCustomers() });
  	},
  	cancelToggle: (formdata) => {
    	dispatch({ type: CANCEL_CUS_SUBSCRIPTION, payload: agent.admin.cusSubToggle(formdata) });
  	},
});

const MainView = (props) => {

	const { allCustomers, onLoadCustomers, subscriptionsCounts, cancelToggle } = props
	const [ allCount, setAllCount ] = useState(0)
	const [ Lists, setLists] = useState({});
	const [ subscriptionsList, setSubscriptionsList] = useState([]);

	useEffect(()=>{
		onLoadCustomers()
	},[])

    const cancelCustSub = (data) => {
		console.log(data)
		if(data.sub_status != 'Expired'){
			let formdata = new FormData();
			formdata.append('c_id',data.id)
			cancelToggle(formdata)
	        console.log("Toggled:", state)
		}
    }

	useEffect(()=>{
		if (allCustomers) {
			setLists(allCustomers)
			setAllCount(allCustomers.length)
		}
		
	},[allCustomers])

	useEffect(()=>{
		if (subscriptionsCounts) {
			setSubscriptionsList(subscriptionsCounts);
		}
		
	},[subscriptionsCounts])

    let tableProps = {
    	Lists,
    	cancelCustSub
    }

	return (
		<Fragment>
			<section className="dashboard-section">
				<Container fluid>  
					<Row className="mb-5">
			           <Col md={6}>
			           		<div className="business-card card-red-bg">
			           			<p>Total Number of Customers</p>
			           			<div className="d-flex counting-div-outer">
				           			<h2>{allCount}</h2>
				           			<div className="plans-subscription">
				           			{ (subscriptionsList.length > 0)?
				           				subscriptionsList.map((sub,i) => (
									        <p>
								          {sub.name} : {sub.total}
								        </p>
								         ))
							    :''}
				           			</div>
				           			
			           			</div>
								   
			           			<Image src={users} />
			           		</div>
			           	</Col>
			        </Row>
			      	<div className="shadow-box business-table">
			      		<Table {...tableProps} />
			      	</div>

			  </Container> 
			</section>
		</Fragment>
	);
    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);