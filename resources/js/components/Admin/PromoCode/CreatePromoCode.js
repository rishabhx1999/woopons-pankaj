import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import profile from "../../../assets/images/avtar.jpg";
import { options as selectOptions } from "../../../constants/businessType";
import { validate as FormValidate, ListErrorMessages } from '../../../constants/Validations';
import { useNavigate } from "react-router-dom";
import {
  	CREATE_PROMO_CODE,
  	CLEAR_PROMO_CODE_MESSAGES,
  	PAGE_ATTR
} from "../../../constants/actionTypes";
// import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';

const mapStateToProps = (state) => ({
  	...state,
  	newPromoCodes: state.admin.newPromoCodes,
  	errorAddPromo: state.admin.errorAddPromo,
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (formData) => {
    	dispatch({ type: CREATE_PROMO_CODE, payload: agent.admin.createNewCodes(formData) });
  	},
    setPageHeading: (title) => {
        dispatch({ type: PAGE_ATTR, pageheading: title });
    }
});

const CreatePromoCode = (props) => {

	const { setPageHeading, pageheading, onSubmit, errorAddPromo, newPromoCodes} = props;

	let navigate = useNavigate();

	useEffect(() => {  		
		if(pageheading){
            setPageHeading(pageheading);
		}else{
			setPageHeading("Promo Code");
		}
  		
  	}, [pageheading])

  	useEffect(() => {  		
		if(newPromoCodes){
            navigate('/admin/promocodes')
		}
  		
  	}, [newPromoCodes])

	const [codeValue, setCodeValue] = useState(14);
	const [codeText, setCodeText] = useState("");

	const [Errors, setErrors] = useState({});

    const submitBtn =  (e) => {
	    e.preventDefault();
	    let checkValidate = FormValidate({
             codeText: { value: codeText, required: true },
             codeValue: { value: codeValue, required: true },
        });

	    if(!checkValidate.status) {
	        setErrors(null);
	        submitHandle()
	    } else {
	        let values = ListErrorMessages(checkValidate.errors);
	        setErrors(values);
	    }
	     
	}; 

	const submitHandle =  () => {
	     // debugger;
	     const formData = new FormData();

         formData.append("code_text", codeText);
         formData.append("code_value", codeValue);
	     onSubmit(formData);
	}; 

	return (
		<Fragment>
			<section className="profile-main-sec">
				<Container fluid>
					<Row className="justify-content-center">
						
			        	<Col lg={6}>
                              {errorAddPromo ? <Alert variant="danger">{errorAddPromo}</Alert> : <Fragment /> }
			        		
			        		<div className="darkblue-sec mt-5 mb-5">
			        			
				        		<div className="outer-form-plan">
				        			<Form>
								      <Form.Group className="mb-3" controlId="formBasicEmail">
								        <Row>
								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control 
								        			    type="text"
								        			    value={codeText}
								        			    placeholder="Code Text"
								        			    onChange={(e) => setCodeText(e.target.value)}
								        			/>
								        			<span className="text-danger">{(Errors && Errors.codeText ) ? Errors.codeText : '' }</span>
								        		</div>
								        	</Col>

								        	<Col lg={12} className="mt-4">
								        		<div className="outer-form">
								        			<Form.Control
											          as="select"
											          value={codeValue}
											          onChange={e => {
											            console.log("e.target.value", e.target.value);
											            setCodeValue(e.target.value);
											          }}
											        >
											        <option value={14} >14 days</option>
											        <option value={30} >30 days</option>
											        <option value={90} >90 days</option>
											        <option value={365} >365 days</option>
											        </Form.Control>
											        <span className="text-danger">{(Errors && Errors.codeValue ) ? Errors.codeValue : '' }</span>
								        		</div>
								        	</Col>
								        	<Col lg={12} className="mt-4">
								        		<div className="right-profile-btn text-right">
							        				<Button className="orange-btn custom-btn w-100" onClick={submitBtn}>Save</Button>
							        			</div>
								        	</Col>
								        	
								        </Row>
								      </Form.Group>
								    </Form>
				        		</div>
                            </div>
			        	</Col>
			      	</Row>
			    </Container>
			</section>
		</Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePromoCode);