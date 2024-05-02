import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  	...state
});

const mapDispatchToProps = (dispatch) => ({});

const Detail = (props) => {

	const { btext } = props

	return (
		<Fragment>
		    	<Col lg={12}>
		        	<div className="plan-left">
		        		<div className="plan-red mt-4">
			        		<h3 className="text-center"><span> {btext} </span></h3>
			        		
			        		
			        	</div>
		        	</div>
		    	</Col>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);