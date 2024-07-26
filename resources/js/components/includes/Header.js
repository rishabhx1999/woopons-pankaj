import React, { useEffect, useState, Fragment, useRef } from "react";
import { connect } from "react-redux";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    Image,
    Row,
    Col,
    Modal,
    Alert,
} from "react-bootstrap";
import {
    NavLink,
    useNavigate,
    Link,
    useSearchParams,
    useLocation,
} from "react-router-dom";

import agent from "../../agent";
import ProfileViewer from "./includes/ProfileViewer";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
    TOP_HEADER,
    RIGHT_HEADER,
    TOP_HEADER_BUSINESS,
} from "./../../constants/header.js";
import { LOGOUT_USER, LOGIN } from "../../constants/actionTypes";
const logo = "/frontImages/logo.png";

const mapStateToProps = (state) => {
    return {
        ...state,
        appName: state.common.appName,
        currentUser: state.common.currentUser,
        loginSuccess: state.common.loginSuccess,
        loginError: state.common.loginError,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSignOut: () => {
        dispatch({ type: LOGOUT_USER });
    },
    onSubmit: (values) =>
        dispatch({ type: LOGIN, payload: agent.Auth.login(values) }),
    // onSignOut: () => { dispatch({ type: LOGOUT, payload: agent.Auth.logout() }) },
});

const Header = (props) => {
    const {
        inProgress,
        appName,
        currentUser,
        onSignOut,
        loginError,
        loginSuccess,
        onSubmit,
        breakpoint = 640,
    } = props;
    // const { roleId } = currentUser;
    console.log(
        "resources js components includes Header.js inProgress" + inProgress
    );
    const wrapperRef = useRef(null);

    const [roleId, setRoleID] = useState(null);
    const [show, setShow] = useState(false);

    const [headerMenus, setheaderMenus] = useState(TOP_HEADER);
    const [mainLink, setMainLink] = useState("/");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassowrd, setShowPassword] = useState(false);
    const [loginErr, setLoginErr] = useState("");

    const [emailError, seteEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [resetErr, setResetErr] = useState("");
    const [resetSucc, setResetSucc] = useState("");

    const [forgotEmail, setForgotEmail] = useState("");

    const [searchParams] = useSearchParams();

    const checkForDevice = () => window.innerWidth < breakpoint;

    const [isMobile, setIsMobile] = useState(checkForDevice());

    const handleClose = () => setShow(false);

    const handleShow = () => {
        console.log("resources js components includes Header.js handleShow");
        if (wrapperRef.current.classList.contains("show")) {
            console.log(
                "resources js components includes Header.js handleShow wrapperRef"
            );
            var btn = document.getElementsByClassName("navbar-toggler");
            btn[0].click();
        }

        setShow(true);
    };

    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setRoleID(currentUser.roleId);
        } else {
            setRoleID(null);
        }
    }, [currentUser]);

    const location = useLocation();
    const { pathname } = location;

    const submitForm = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    const submitForgotForm = (e) => {
        e.preventDefault();
        onForgotPaaswordSubmit({ email: forgotEmail });
    };

    const forgotPage = (e) => {
        e.preventDefault();
        setShow(false);
        navigate("/user/forgotpassword");
    };

    const goToBecomeMember = () => {
        setShow(false);
        navigate("/becomemember");
    };

    const handleShowmenuMobile = () => {
        const currentParams = Object.fromEntries([...searchParams]);
        // console.log(currentParams); // get new values onchange
        if (currentParams && currentParams.element) {
            // debugger
            const element = document.getElementById(currentParams.element);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }

        if (isMobile) {
            var btn = document.getElementsByClassName("navbar-toggler");
            btn[0].click();
        }
    };

    let valProps = {
        currentUser,
        onSignOut,
    };

    useEffect(() => {
        if (loginError) {
            if (typeof loginError === "string") {
                setLoginErr(loginError);
            } else {
                if ("user" in loginError) {
                    seteEmailError(loginError.user);
                } else if ("password" in loginError) {
                    setPasswordError(loginError.password);
                } else {
                    setLoginErr(loginError);
                }
            }

            setTimeout(function () {
                setLoginErr("");
                seteEmailError("");
                setPasswordError("");
            }, 5000);
        }
    }, [loginError]);

    useEffect(() => {
        if (currentUser && currentUser.roleId) {
            if (currentUser.roleId != 1) {
                setShow(false);
                // navigate('/');
            }
        }
        if (currentUser && currentUser.roleId) {
            if (currentUser.roleId == 2) {
                setheaderMenus(TOP_HEADER_BUSINESS);
                setMainLink("/business");
                // navigate('/business');
                // navigate('/');
            } else {
                setheaderMenus(TOP_HEADER);
                setMainLink("/");
                // navigate('/');
                // navigate('/');
            }
        }
    }, [currentUser]);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            let toggleButn =
                document.getElementsByClassName("navbar-toggler")[0];
            let _spanTgl = document.getElementsByClassName(
                "navbar-toggler-icon"
            )[0];
            // debugger
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                // alert("You clicked outside of me!");
                if (toggleButn == event.target || _spanTgl == event.target) {
                    return true;
                }
                if (wrapperRef.current.classList.contains("show")) {
                    var btn = document.getElementsByClassName("navbar-toggler");
                    btn[0].click();
                }
                //
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (pathname.includes("/business")) {
            setheaderMenus(TOP_HEADER_BUSINESS);
            setMainLink("/business");
        }

        const handlePageResized = () => {
            setIsMobile(checkForDevice());
        };

        if (typeof window !== "undefined") {
            window.addEventListener("resize", handlePageResized);
            window.addEventListener("orientationchange", handlePageResized);
            window.addEventListener("load", handlePageResized);
            window.addEventListener("reload", handlePageResized);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handlePageResized);
                window.removeEventListener(
                    "orientationchange",
                    handlePageResized
                );
                window.removeEventListener("load", handlePageResized);
                window.removeEventListener("reload", handlePageResized);
            }
        };
    }, []);

    return (
        <div className="header-main">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={2} sm={12} className="header-mobile">
                            <Nav.Link as={NavLink} to={mainLink} exact="true">
                                {logo ? (
                                    <Image
                                        src={logo}
                                        alt="logo"
                                        className="logo-img"
                                    />
                                ) : (
                                    <p>{appName}</p>
                                )}
                            </Nav.Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </Col>
                        <Col lg={10} sm={10}>
                            <div className="right-navbar">
                                <Navbar.Collapse
                                    ref={wrapperRef}
                                    id="basic-navbar-nav"
                                >
                                    <Nav className="me-auto">
                                        {headerMenus.map((menu, i) => {
                                            let acessor = menu.accessor;
                                            let hideFrom = menu.hideFrom;
                                            let showMenu = false;
                                            if (acessor == "all") {
                                                showMenu = true;
                                            } else if (
                                                acessor == "front" &&
                                                !currentUser
                                            ) {
                                                showMenu = true;
                                            } else if (
                                                typeof acessor == "object"
                                            ) {
                                                if (
                                                    roleId &&
                                                    acessor.indexOf(roleId) !==
                                                        -1
                                                ) {
                                                    showMenu = true;
                                                }
                                            }

                                            if (
                                                hideFrom == "customer" &&
                                                currentUser
                                            ) {
                                                showMenu = false;
                                            }

                                            return (
                                                <Fragment key={i}>
                                                    {showMenu ? (
                                                        <Nav.Link
                                                            exact="true"
                                                            as={NavLink}
                                                            onClick={
                                                                handleShowmenuMobile
                                                            }
                                                            to={menu.link}
                                                        >
                                                            {menu.name}
                                                        </Nav.Link>
                                                    ) : (
                                                        <Fragment />
                                                    )}
                                                </Fragment>
                                            );
                                        })}
                                    </Nav>
                                </Navbar.Collapse>
                                <div className="right-header-location">
                                    {currentUser && currentUser.roleId != 1 ? (
                                        <ProfileViewer {...valProps} />
                                    ) : (
                                        <>
                                            <Fragment>
                                                <Nav.Link
                                                    activeclassname="active"
                                                    className="contact-btn"
                                                    onClick={handleShow}
                                                >
                                                    Sign In
                                                </Nav.Link>
                                            </Fragment>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
            <Modal className="modal-custom" show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="popup-content">
                        <h2 className="text-center skyblue-text">Login</h2>
                        {loginErr ? (
                            <Alert variant="danger">{loginErr}</Alert>
                        ) : (
                            <Fragment />
                        )}
                        <form onSubmit={submitForm}>
                            <fieldset>
                                <fieldset className="form-group mb-4">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control form-control-md"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onKeyPress={(e) => seteEmailError(null)}
                                        required
                                    />
                                    <span className="text-danger">
                                        {emailError}
                                    </span>
                                </fieldset>

                                <fieldset className="form-group position-relative">
                                    <label>Password</label>
                                    <div className="password-eye">
                                        <input
                                            className="form-control form-control-md"
                                            type={
                                                showPassowrd
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            onKeyPress={(e) =>
                                                setPasswordError("")
                                            }
                                            required
                                        />
                                        <span
                                            onClick={(e) =>
                                                setShowPassword(!showPassowrd)
                                            }
                                        >
                                            {showPassowrd ? (
                                                <AiOutlineEye className="hide-pass" />
                                            ) : (
                                                <AiOutlineEyeInvisible className="show-pass" />
                                            )}
                                        </span>
                                    </div>
                                    <span className="text-danger">
                                        {passwordError}
                                    </span>
                                    <span
                                        className={`password-icon ${showPassowrd}`}
                                    ></span>
                                </fieldset>

                                <div className="forgot-pass text-right mb-4">
                                    <a
                                        onClick={forgotPage}
                                        className="red-text"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                <button
                                    className="login-button btn btn-md btn-primary custom-button w-100 mb-3 orange-btn-border"
                                    type="submit"
                                    disabled={inProgress}
                                >
                                    LOG IN
                                </button>
                            </fieldset>
                        </form>
                        {/* <button */}
                        {/*      	className="login-button btn btn-md btn-primary custom-button w-100" */}
                        {/*      	type="button" */}
                        {/*      	onClick={goToBecomeMember} */}
                        {/*    > */}
                        {/*      	Become our member */}
                        {/*    </button> */}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
