import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import agent from "../../../agent";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    NavLink,
    Form,
    Badge,
    Alert,
} from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import profile from "../../../assets/images/avtar.jpg";
import { useNavigate, useParams } from "react-router-dom";

import {
    validate as FormValidate,
    ListErrorMessages,
} from "../../../constants/Validations";

import {
    CREATE_CUSTOMER,
    CREATE_CUSTOMER_CLEAR_MESSAGES,
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
    ...state,
    customerUser: state.common.customerUser,
    successMsg: state.common.successMsg,
    errorMsg: state.common.errorMsg,
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData) => {
        dispatch({
            type: CREATE_CUSTOMER,
            payload: agent.common.customercreate(formData),
        });
    },
    clearCustomerMessages: () => {
        dispatch({ type: CREATE_CUSTOMER_CLEAR_MESSAGES });
    },
});

const MainView = (props) => {
    const {
        currentAdminUser,
        currentUser,
        onSubmit,
        successMsg,
        errorMsg,
        clearCustomerMessages,
        customerUser,
    } = props;

    const [fName, setFName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [imageValidError, setImageValidError] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [show_image, setShowImage] = useState(profile);

    const [errorText, setErrorText] = useState("");
    const [errors, setErrors] = useState({});

    let navigate = useNavigate();
    let params = useParams();

    const submitBtn = (e) => {
        e.preventDefault();
        let checkValidate = FormValidate({
            email: { value: email, email: true, required: true },
            phone: { value: phone, required: true, numbers: true },
            name: { value: fName, required: true },
        });

        if (!checkValidate.status) {
            setErrors(null);
            submitHandle();
        } else {
            let values = ListErrorMessages(checkValidate.errors);
            console.log(values);
            setErrors(values);
        }
    };

    const submitHandle = () => {
        const formData = new FormData();
        if (profileImage) {
            formData.append("profile", profileImage);
        }
        formData.append("name", fName);
        formData.append("email", email);
        formData.append("phone", phone);
        onSubmit(formData);
    };

    const handleChangeProfile = (event) => {
        const prflImage = event.target.files[0];
        if (!prflImage.name.match(/\.(jpg|jpeg|png)$/)) {
            setImageValidError("Only .png, .jpg and .jpeg format allowed!");
            return false;
        } else {
            setProfileImage(prflImage);
            setShowImage(URL.createObjectURL(prflImage));
        }
    };

    useEffect(() => {
        if (successMsg) {
            // debugger
            setTimeout(function () {
                clearCustomerMessages();
            }, 3000);
        }
    }, [successMsg]);

    useEffect(() => {
        if (customerUser) {
            localStorage.setItem("customerUser", customerUser.id);
            navigate("/customer/enterotp/" + params.plan);
        }
    }, [customerUser]);

    useEffect(() => {
        if (errorMsg) {
            if (typeof errorMsg == "string") {
                setErrorText(errorMsg);
            } else {
                setErrors(errorMsg);
            }

            setTimeout(function () {
                clearCustomerMessages();
            }, 6000);
        }
        if (imageValidError) {
            setTimeout(function () {
                setImageValidError("");
            }, 6000);
        }
    }, [errorMsg, imageValidError]);

    return (
        <Fragment>
            <section className="profile-main-sec p-50">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <h3 className="inner-pages-title text-center">
                                Create an account to start your membership
                            </h3>
                        </Col>

                        <Col lg={6}>
                            {successMsg ? (
                                <Alert variant="success">{successMsg}</Alert>
                            ) : (
                                <Fragment />
                            )}
                            {errorText ? (
                                <Alert variant="danger">{errorText}</Alert>
                            ) : (
                                <Fragment />
                            )}
                            <div className="profile-edit-outer d-flex align-items-center justify-content-center">
                                <div className="profile-edit">
                                    <div className="profile-circle">
                                        <Image
                                            src={show_image}
                                            className="profile-img"
                                        />
                                        <Form.Control
                                            type="file"
                                            onChange={handleChangeProfile}
                                        />
                                        <FiEdit />
                                    </div>
                                </div>
                            </div>
                            <span className="text-danger">
                                {imageValidError}
                            </span>
                            <div className="darkblue-sec">
                                <div className="outer-form-plan">
                                    <Form>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                        >
                                            <Row>
                                                <Col lg={12} className="mt-4">
                                                    <div className="outer-form">
                                                        <Form.Label>
                                                            Full Name
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={fName}
                                                            onChange={(e) =>
                                                                setFName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <span className="text-danger">
                                                        {errors && errors.name
                                                            ? errors.name
                                                            : ""}
                                                    </span>
                                                </Col>
                                                <Col lg={12} className="mt-4">
                                                    <div className="outer-form">
                                                        <Form.Label>
                                                            Email
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <span className="text-danger">
                                                        {errors && errors.email
                                                            ? errors.email
                                                            : ""}
                                                    </span>
                                                </Col>
                                                <Col lg={12} className="mt-4">
                                                    <div className="outer-form">
                                                        <Form.Label>
                                                            Cell Phone
                                                        </Form.Label>
                                                        <br />
                                                        <Form.Label>
                                                            <span>
                                                                Please input
                                                                your number only
                                                            </span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={phone}
                                                            onChange={(e) =>
                                                                setPhone(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <span className="text-danger">
                                                        {errors && errors.phone
                                                            ? errors.phone
                                                            : ""}
                                                    </span>
                                                </Col>
                                                <Col lg={12} className="mt-4">
                                                    <div className="right-profile-btn text-right">
                                                        <Button
                                                            className="orange-btn custom-btn w-100"
                                                            onClick={submitBtn}
                                                        >
                                                            Send OTP
                                                        </Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
