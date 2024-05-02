import React, { useEffect,useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import user from "../../../assets/images/user-main.png";
import business from "../../../assets/images/business-icon.png";


import { Link } from "react-router-dom";

import Table from '../Table';
// import ToggleButton from '../../Toggle';


import {
  	ALL_BUSSINESS_DATA,
  	TOGGLE_BUSSINESS
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
  	...state,
  	allBussinesses: state.admin.allBussinesses,
  	subscriptionsCountsBus: state.admin.subscriptionsCountsBus,
});

const mapDispatchToProps = (dispatch) => ({
	onLoadBussinesses: () => {
    	dispatch({ type: ALL_BUSSINESS_DATA, payload: agent.admin.getBussinesses() });
  	},
  	featuredToggle: (formdata) => {
    	dispatch({ type: TOGGLE_BUSSINESS, payload: agent.admin.featuredToggle(formdata) });
  	},
});

const MainView = (props) => {

	const { allBussinesses, subscriptionsCountsBus, onLoadBussinesses, featuredToggle } = props
	const [ Lists, setLists] = useState({});
	const [ allCount, setAllCount ] = useState(0)

	const [ subscriptionsList, setSubscriptionsList] = useState([]);

	useEffect(()=>{
		onLoadBussinesses()
	},[])

	const logState = (data) => {
		console.log(data.business_id)
		let formdata = new FormData();
		formdata.append('b_id',data.business_id)
		featuredToggle(formdata)
        // console.log("Toggled:", state)
    }

	useEffect(()=>{
		if (allBussinesses) {
			setLists(allBussinesses)
			setAllCount(allBussinesses.length)
			// console.log(Lists)
			// debugger
			
			
		}
		
	},[allBussinesses])
	useEffect(()=>{
		if (subscriptionsCountsBus) {
			setSubscriptionsList(subscriptionsCountsBus);
			
		}
		
	},[subscriptionsCountsBus])

    let tableProps = {
    	Lists,
    	logState
    }
  //   let toogleProps = {
  //   	label:"Toggle me",
		// toggled:true,
		// onClick:logState
  //   }

	return (
		<Fragment>
			<section className="dashboard-section">
				<Container fluid>  

					<Row className="mb-5">
			           <Col md={6}>
			           		<div className="business-card card-yellow-bg">
			           			<p>Total Number of Business</p>
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
			           			<Image src={business} />
			           		</div>
			           	</Col>
			           <Col md={6} className="text-right">
			           		<Link to="/admin/business/create" className="custom-btn btn-primary red-btn">Create Business Account</Link>
			           	
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