import React, { useEffect, useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Button, Form, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';

import DataTable from 'react-data-table-component';

import Loader from "../../Loader";

import { useNavigate,Link,useLocation } from "react-router-dom";

import moment from "moment";
import EventPopup from '../../EventPopup';


import {
  	FETACH_ALL_PROMOCODES,
  	CLEAR_PROMO_CODE_MESSAGES
} from "../../../constants/actionTypes";



const mapStateToProps = (state) => ({
  	...state,
  	allPromoCodes: state.admin.allPromoCodes,
  	newPromoCodes: state.admin.newPromoCodes,
});

const mapDispatchToProps = (dispatch) => ({
	fetchPromoCodes: () => {
    	dispatch({ type: FETACH_ALL_PROMOCODES, payload: agent.admin.getAllCodes() });
  	},
  	promoCodeDelete: (formdata) => {
    	dispatch({ type: FETACH_ALL_PROMOCODES, payload: agent.admin.deleteProCode(formdata) });
  	},
  	clearPromoMessages: () => {
        dispatch({ type: CLEAR_PROMO_CODE_MESSAGES });
    }
});

const MainView = (props) => {

	const { allPromoCodes, fetchPromoCodes, newPromoCodes, clearPromoMessages, promoCodeDelete } = props;

	const [showToggle, setShowToggle] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [pending, setPending] = useState(false);

	const [promoCodes,setPromoCodes] = useState([]);

	const [ deleteCode, setDeleteCode] = useState(null);

	let navigate = useNavigate();

	const deleteAction = (data) => {
		setDeleteCode(data.id);
		setShowToggle(true)
	}

	const submitAction = () => {
		console.log(deleteCode)

		const formData = new FormData();

		formData.append("id", deleteCode);

		promoCodeDelete(formData)
		
		setDeleteCode(null)
	    setShowToggle(false);

	}


	let  a = 0;
	

	const columns = [
	    {
	    	id:"sno",
	        name: 'S.no',
	        cell: (row, index) => {
	        	return ('0' + row.id );
	        }
	    },
	    {
            id:"name",
	        name: 'Code',
	        cell: (row, index) => {
	        	return (row.code_text)
		    },
	    },
	    {
            id:"type",
	        name: 'For Days',
	        cell: (row, index) => {
	        	return (row.code_value)
		    },
	    },
	    {
            id:"id",
	        name: 'Actions',
	        cell: (row, index) => {
	        	return (
		          <div className="coupon-actions">
		            <span onClick={()=> deleteAction(row)} className="bedge-btn red-bedge">Delete</span>
		          </div>
		        );
		    },
	    }
	];


	useEffect(() => {  	
  		fetchPromoCodes();
  	}, []) 

  	useEffect(() => {  		
		console.log(promoCodes)
  	}, [promoCodes])

  	useEffect(() => {  		
		setPromoCodes(allPromoCodes)
  	}, [allPromoCodes]) 

  	useEffect(() => {  		
		if(newPromoCodes){
            clearPromoMessages()
		}
  		
  	}, [newPromoCodes])

  	const handleModalClose = () => {
	    setDeleteCode(null)
	    setShowToggle(false);
	}

  	let popupProps = {
      showToggle,
      handleModalClose,
      modalMessage: 'Are you sure you want to delete this Promo Code?',
      notesMessage: '',
      submitAction,
    }

	return (
		<Fragment>
			{isLoading && <Loader /> }
			<EventPopup {...popupProps} />
			<section className="dashboard-section">
				<Container fluid>  

					<Row className="mb-5">
			           <Col md={12} className="text-right">
			           		<Link to="/admin/promocode/create" className="custom-btn btn-primary red-btn">Create Promo Code</Link>
			           	
			           </Col>
			        	
			        </Row>

			      	<div className="shadow-box">
			      		<DataTable
				            columns={columns}
				            data={promoCodes}
				            progressPending={pending}
				            pagination
				        />
			      		
			      	</div>

			  </Container> 
			</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);