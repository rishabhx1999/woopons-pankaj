import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
var logo = "/frontImages/logo.png";

import agent from "../../../agent";

import { CLEAR_MESSAGES, SUBSCRIBE_PLAN } from "../../../constants/actionTypes";
const mapStateToProps = (state) => ({
    ...state,
    spError: state.plan.spError,
    spSuccess: state.plan.spSuccess,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    subscribePlan: (formData) => {
        dispatch({
            type: SUBSCRIBE_PLAN,
            payload: agent.Plan.subscribe(formData),
        });
    },
    clearMessages: () => {
        dispatch({ type: CLEAR_MESSAGES });
    },
});

const Plan = (props) => {
    const {
        plans,
        nextUrl,
        subscribePlan,
        clearMessages,
        currentUser,
        spSuccess,
        spError,
    } = props;
    const [forgotEmail, setForgotEmail] = useState("");

    const [aleardySub, setAlreadySub] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [nextNav, setNextNav] = useState("/user/myaccount");

    const [modalShow, setModalShow] = useState(false);

    let navigate = useNavigate();

    const submitHandle = (e, thisplan) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("plan", thisplan);
        subscribePlan(formData);
    };
    const handleNextNav = () => {
        clearMessages();
        setModalShow(false);
        navigate(nextNav);
    };

    const handleClose = () => {
        setModalShow(false);
    };

    useEffect(() => {
        if (spSuccess) {
            setModalMsg(spSuccess);
            setModalShow(true);
        }
        if (spError) {
            setModalMsg(spError);
            setModalShow(true);
        }
    }, [spError, spSuccess]);

    useEffect(() => {
        if (currentUser && currentUser.roleId == 2) {
            setAlreadySub(true);
        }
    }, []);

    console.log(plans);
    return (
        <Fragment>
            {/* Modal box code*/}
            <Modal
                show={modalShow}
                onHide={handleClose}
                onClose={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="content payment-modal">
                    <div className="form-modal mt-4 mb-4">
                        <h4 className="text-center">{modalMsg}</h4>
                        <div className="right-profile-btn text-center mt-4">
                            <Button
                                onClick={handleNextNav}
                                className="orange-btn custom-btn w-100"
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Modal code end*/}
            {plans && plans.length
                ? plans.map((plan, i) => (
                      <>
                          <Col lg={6}>
                              <div key={i} className="card-main text-center">
                                  <div class="inner-card">
                                      <h3>{plan.name}</h3>

                                      {i ? (
                                          plan.type === "business" ? (
                                              <h2>UP-TO THREE WOO-PONS</h2>
                                          ) : plan.type === "customer" ? (
                                              <>
                                                  <p>
                                                      <span>Monthly</span>{" "}
                                                      (after free trial)
                                                  </p>
                                                  <h2>
                                                      UNLIMITED WOO-PONS PER
                                                      MONTH
                                                  </h2>
                                              </>
                                          ) : null
                                      ) : plan.type === "business" ? (
                                          <h2>ONE WOO-PON</h2>
                                      ) : plan.type === "customer" ? (
                                          <>
                                              <p>
                                                  <span>Monthly</span> (after
                                                  free trial)
                                              </p>
                                              <h2>ONE WOO-PON PER WEEK</h2>
                                          </>
                                      ) : null}
                                  </div>

                                  {plan.type === "customer" ? (
                                      <>
                                          <h3 className="trail-red">
                                              30 DAY FREE TRIAL
                                          </h3>
                                          <span></span>
                                          <h2 className="text-black new-txt-price">
                                              <span>${plan.price}</span>/Month
                                          </h2>
                                      </>
                                  ) : null}

                                  <div class="inner-card2">
                                      {i ? (
                                          plan.type === "business" ? (
                                              <p className="deal-txt">
                                                  This package will allow you to
                                                  bring in more business <br />
                                                  by offering up to 3 Woo-Pons
                                                  per month
                                              </p>
                                          ) : plan.type === "customer" ? (
                                              <p className="deal-txt deat-customer d-none">
                                                  With this package, you can use
                                                  1 Woo-Pon on our platform{" "}
                                                  <br />
                                                  per week
                                              </p>
                                          ) : null
                                      ) : plan.type === "business" ? (
                                          <p className="deal-txt">
                                              This package will allow you to
                                              bring in more business <br />
                                              by offering up to 1 Woo-Pons per
                                              month
                                          </p>
                                      ) : plan.type === "customer" ? (
                                          <p className="deal-txt deat-customer d-none">
                                              With this package, you can use 1
                                              Woo-Pon on our platform <br />
                                              per week
                                          </p>
                                      ) : null}

                                      <div className="btn-yellow-outer">
                                          {aleardySub ? (
                                              <>
                                                  <Link
                                                      to={nextNav}
                                                      onClick={(e) =>
                                                          submitHandle(
                                                              e,
                                                              plan.id
                                                          )
                                                      }
                                                      className={`${
                                                          i > 0 ? " " : ""
                                                      }yellow-btn`}
                                                  >
                                                      BECOME A FOUNDING MEMBER
                                                  </Link>
                                              </>
                                          ) : (
                                              <>
                                                  <Link
                                                      to={
                                                          nextUrl ==
                                                              "/business/plans" ||
                                                          nextUrl ==
                                                              "/home?element=plans"
                                                              ? nextUrl
                                                              : `${
                                                                    nextUrl +
                                                                    plan.slug
                                                                }`
                                                      }
                                                      className={`${
                                                          i > 0 ? " " : ""
                                                      }yellow-btn`}
                                                  >
                                                      {plan.type === "business"
                                                          ? "BECOME A FOUNDING MEMBER"
                                                          : "FREE TRIAL"}
                                                  </Link>
                                              </>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          </Col>
                      </>
                  ))
                : null}
        </Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
