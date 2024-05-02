import React, { Fragment,useState,useEffect } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button, NavLink, Form,Badge, Alert, Modal  } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible   } from 'react-icons/ai';
import { AiFillPlusCircle,AiOutlineCheckCircle } from 'react-icons/ai';
import successTick from '../../assets/success-tick.png';


const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({
});

const MainView = (props) => {
  
  const {popupshow, messagetext,notestext,onSubmit, handleCloseModal, msgerror  } = props;


  return (
    <Fragment>
      <Modal className="modal-custom logout-modal" show={popupshow} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className="popup-content submit-txt">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                    {
                      (!msgerror)
                        ?
                          <Col lg={12} className="mb-2 mt-2 text-center">
                            <Image src={successTick} className="success-icon" />
                          </Col>
                        : null
                    }
                    
                    <Col lg={12} className="text-center">
                       <h2>{messagetext}</h2>
                       {(notestext && notestext != "")?<small>{notestext}</small>:''}
                    </Col>
                    <div className="btn-grup d-flex justify-content-center mt-5">
                    <button
                        className="logout-btn-no login-button btn btn-md custom-button"
                          type="button"
                          onClick={onSubmit}
                      >Okay</button>
                    </div>
                </Row>
              </Form.Group>
            </div>
          </Modal.Body>
          
        </Modal>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);