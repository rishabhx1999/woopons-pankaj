import React, { useEffect, useState, Fragment } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Button, Form,Badge } from 'react-bootstrap';
import { AiFillPlusCircle, AiOutlineCheck, AiFillWechat} from 'react-icons/ai';

import DataTable from 'react-data-table-component';

import { useNavigate,Link } from "react-router-dom";




import {
  	CLEAR_MESSAGES,
  	ALL_USERS,
} from "../../../constants/actionTypes";



const mapStateToProps = (state) => ({
  	...state,
  	AllUsers: state.admin.AllUsers,
  	currentUser: state.common.currentUser,
  	errMessage: state.query.errMessage,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAllUsers: (user_id) => {
    	dispatch({ type: ALL_USERS, payload: agent.admin.fetchUsers() });
  	},
    clearMessages: () => {
        dispatch({ type: CLEAR_MESSAGES });
    }
});
const redirectRow = (row,event,navigate) => {

	if(row._id != undefined){
        navigate('/admin/plan/'+row._id);
	}
}

const renderStatus = (row)=> {

		switch (row.status) {
		    case "0":
			    return (
			    	<Fragment>
			    	   <span className="orange-back bk-tag">Incomplete</span>
			    	</Fragment>
			    )	
			    break;
		    case "1":
			    return (
			    	<Fragment>
			    	   <span className="green-back bk-tag">Resolved</span>
			    	</Fragment>
			    )
			    break; 
		}
}
const MainView = (props) => {

	const {currentUser,AllUsers,fetchAllUsers,clearMessages,errMessage} = props;

	let navigate = useNavigate();


	let  a = 0;

	const columns = [
	    {
	    	id:"userid",
	    	width: "10%",
	        name: 'USER ID',
	        cell: (row, index) => row.id,
	    },
	    {
            id:"name",
            width: "20%",
	        name: 'NAME',
	        cell: (row, index) => row.firstname+' '+row.lastname,
	    },
	    {
	    	id:"email",
	        name: 'EMAIL',
	        width: "40%",
	        selector: row => row.email,
	    },
	    {
	    	id:"phone",
	    	width: "20%",
	        name: 'PHONE',
	        selector: row => row.phone,
	    },
	    {
	    	id:"chat",
	    	width: "10%",
	        name: 'CHAT',
	        cell: (row, index) => <div className="chat-icon"><AiFillWechat /></div>,
	    }
	];
	

	const [newmodalshow,setNewModalShow] = useState(false);
	const [users,setUsers] = useState(false);


	useEffect(() => {  		
		if(currentUser){
			clearMessages();
			fetchAllUsers();
		}
  		
  	}, [currentUser]) 
  	useEffect(() => {  		
		if(users){
			console.log(users)
		}
  		
  	}, [users]) 
  	useEffect(() => {  	
  	   if(AllUsers){
  	    	setUsers(AllUsers);
  	   }	
  		
  	}, [AllUsers]) 

  



	return (
		<Fragment>
			<section className="setting-sec">
			<div className="shadow-box">
				<Row className="">
			           <Col md={6}><p className="user-title">Users</p></Col>
			     </Row>
			      <Row>
			        <Col lg={12}>
				        <div className="setting-outer mt-4">
				        	<div className="dataTable">
					        	<DataTable
						            columns={columns}
						            data={users}
						        />
						    </div>    
						</div>
					</Col>
			      </Row>
			</div>
			</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);