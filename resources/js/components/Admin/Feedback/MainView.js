import React, { useEffect, useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Button, Form, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { AiFillPlusCircle, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { FaAngleDown, FaTimes } from 'react-icons/fa';

import DataTable from 'react-data-table-component';

import Loader from "../../Loader";

import { useNavigate,Link,useLocation } from "react-router-dom";

import moment from "moment";

import Multiselect from 'multiselect-react-dropdown';



import {
  	FETACH_ADMIN_FEEDBACKS_DATA
} from "../../../constants/actionTypes";



const mapStateToProps = (state) => ({
  	...state,
  	feedbackData: state.admin.feedbackData,
});

const mapDispatchToProps = (dispatch) => ({
	fetchFeedbacks: (formData) => {
    	dispatch({ type: FETACH_ADMIN_FEEDBACKS_DATA, payload: agent.admin.getFeedbacks(formData) });
  	},
});

const MainView = (props) => {

	const {feedbackData, fetchFeedbacks} = props;

	const [options, setOptions] = useState([{name: 'Recent', value: "recent"},{name: 'Customer', value: "customer"},{name: 'Business', value: "business"}]);


	let navigate = useNavigate();


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
	        name: 'user name',
	        cell: (row, index) => {
	        	return (row.user_name)
		    },
	    },
	    {
            id:"email",
	        name: 'user email',
	        cell: (row, index) => {
	        	return (row.user_email)
		    },
	    }, 
	    {
            id:"phone",
	        name: 'user phone',
	        cell: (row, index) => {
	        	return (row.user_phone)
		    },
	    },
	    {
            id:"type",
	        name: 'user type',
	        cell: (row, index) => {
	        	return (row.user_type)
		    },
	    },
	    {
            id:"feedback",
	        name: 'user feedback',
	        cell: (row, index) => {
	        	return (row.feedback)
		    },
	    },
	];
	  

	const [isLoading, setIsLoading] = useState(false);

	const [pending, setPending] = useState(false);

	const [feedbacks,setFeedbacks] = useState([]);

	const [items, setItems] = useState([]);


	useEffect(() => {  	
		const formData = new FormData();

  		fetchFeedbacks(formData);
  	}, []) 

  	useEffect(() => {  		
		console.log(feedbacks)
  		// fetchAdminClubs();
  	}, [feedbacks])

  	useEffect(() => {  		
		setFeedbacks(feedbackData)
		console.log('here feddnasldsld')
		console.log(feedbacks)
  		// fetchAdminClubs();
  	}, [feedbackData]) 

  	const handleSelect = (selectedList) => {
	    setItems(selectedList);
	    document.querySelector(".dropdown-div #search_input").placeholder = "";

	    applyFilter(selectedList);

	};

	const handleRemove = (selectedList) => {
	    setItems(selectedList);
	    applyFilter(selectedList);
	    if(selectedList.length == 0){
	    	document.querySelector(".dropdown-div #search_input").placeholder = "Select";
	    }
	};

	const applyFilter = (selectedList) => {
	    const formData = new FormData();

	    if(selectedList.length > 0){
	    	selectedList.forEach((data, index) => {
			    formData.append("filter[]", data.value);
			});
	    }
	    fetchFeedbacks(formData);
        
	};

  	// useEffect(() => {  		
  	// 	if(adminclubs){
  	// 		adminclubs.forEach((club, index) => { club.serial = index + 1; });
  	// 		setIsLoading(false);
  	// 		setClubList(adminclubs);
  	// 	}
  	// }, [adminclubs]) 



	return (
		<Fragment>
		    {isLoading && <Loader /> }
			<section className="plans-sec">
				<Container fluid>
			      <Row>
			        <Col lg={12}>
				        <div className="plans-outer">
				            <div className="dropdown-div">
                               <Multiselect
									options={options} // Options to display in the dropdown
									displayValue="name" // Property name to display in the dropdown options
									onSelect={handleSelect} // Function will trigger on select event
                                    onRemove={handleRemove} // Function will trigger on remove event
                                    customCloseIcon={<AiOutlineClose />}
                                    showArrow="true"
                                    customArrow={<FaAngleDown  className='angleDownCls' />}
								/>
								{/*<FaAngleDown  className='angleDownCls' />*/}
				            </div>
				        	
                            <hr />
				        	<div className="dataTable">
					        	<DataTable
						            columns={columns}
						            data={feedbacks}
						            progressPending={pending}
						            pagination
						        />
						    </div>   
						</div>
					</Col>
			      </Row>
			    </Container>
			</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);