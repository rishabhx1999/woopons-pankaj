import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import agent from "../../agent";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { NavLink, Link, useSearchParams, useNavigate } from "react-router-dom";
import {
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineInstagram,
    AiOutlineTwitter,
} from "react-icons/ai";
import { TiSocialFacebook } from "react-icons/ti";
import { FaLinkedinIn } from "react-icons/fa";
import footerlogo from "../../../../public/images/footer-logo.png";
import Accordion from "react-bootstrap/Accordion";

import features1 from "../../assets/images/features1.png";
import mobile1 from "../../assets/images/mobile1.png";
import leftimg1 from "../../assets/images/left-img1.png";
import rightimg1 from "../../assets/images/right-img1.png";
import leftmob from "../../assets/images/left-mob.png";
import grpimgs from "../../assets/images/grp-imgs.png";
import supportimg from "../../assets/images/support-img.png";
import { TiTick } from "react-icons/ti";
import Plans from "../views/Plans";
import AboutUs from "../views/AboutUs";

const video1 = "/images/video1.mp4";

import {
    FEATCH_CUSTOMER_PLANS,
    CUSTOMER_LOGIN_TOKEN,
} from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
    ...state,
    currentUser: state.common.currentUser,
    customerPlans: state.common.customerPlans,
    redirectToAccount: state.common.redirectToAccount,
});

const mapDispatchToProps = (dispatch) => ({
    onLoadPage: () =>
        dispatch({
            type: FEATCH_CUSTOMER_PLANS,
            payload: agent.common.getCusPlans(),
        }),
    loginFromToken: (formData) =>
        dispatch({
            type: CUSTOMER_LOGIN_TOKEN,
            payload: agent.customer.getCusFromToken(formData),
        }),
});

const MainView = (props) => {
    const {
        currentUser,
        customerPlans,
        onLoadPage,
        loginFromToken,
        redirectToAccount,
        breakpoint = 640,
    } = props;

    const [plans, setPlans] = useState([]);
    const [nextUrl, setNextUrl] = useState([]);
    const [searchParams] = useSearchParams();
    let navigate = useNavigate();

    const checkForDevice = () => window.innerWidth < breakpoint;

    const [isMobile, setIsMobile] = useState(checkForDevice());

    const videoEl = useRef(null);

    const attemptPlay = () => {
        let _vdo = document.getElementById("banner-video");
        _vdo.muted = false;
        document.body.click();
        if (_vdo.paused) {
            _vdo.volume = 0.2;
            document.getElementById("banner-video").play();
            setTimeout(function () {
                document.getElementById("banner-video").play();
            }, 5000);
            // _vdo.play();
        }

        /* setTimeout(function(){

			let _vdo2 = document.getElementById('banner-video');
			_vdo2.enabled=true


		},4000) */
    };

    useEffect(() => {
        // console.log(customerPlans)
        setPlans(customerPlans);
    }, [customerPlans]);

    useEffect(() => {
        onLoadPage();
        // console.log(searchParams)
        // if (params && params.element) {
        // const element = document.getElementById(params.element);
        // if (element) {
        // 	element.scrollIntoView({behavior: 'smooth'});
        // }
        // }
        // document.body.click()
        // document.getElementById('banner-video').click()
        const handlePageResized = () => {
            setIsMobile(checkForDevice());
            // attemptPlay();
        };
        // let _vdo = document.getElementById('banner-video');
        // _vdo.addEventListener("click", function(e) {
        // 	_vdo.play()
        // });

        if (document.readyState === "complete") {
            attemptPlay();

            // document.getElementById('banner-video').click()
        }

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

    const goToElement = (elm) => {
        const element = document.getElementById(elm);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const goToPlanElement = () => {
        const element = document.getElementById("plans");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);
        console.log(currentParams); // get new values onchange
        if (currentParams && currentParams.element) {
            goToElement(currentParams.element);
        }
        if (currentParams && currentParams.access_token) {
            let formData = { token: currentParams.access_token };
            loginFromToken(formData);
        }
    }, [searchParams]);

    useEffect(() => {
        if (redirectToAccount) {
            navigate("/user/myaccount");
        }
    }, [redirectToAccount]);

    useEffect(() => {
        console.log(isMobile);
    }, [isMobile]);

    useEffect(() => {
        if (currentUser && currentUser.roleId == 3) {
            if (currentUser.email_verified) {
                setNextUrl("/payment/");
            } else {
                setNextUrl("/customer/enterotp/");
            }
        } else if (currentUser && currentUser.roleId == 2) {
            setNextUrl("/business/plans");
        } else {
            setNextUrl("/customer/create/");
        }
    }, [currentUser]);

    let planProps = {
        plans,
        nextUrl,
        buttonText: "Get Started With A 30 DAY FREE TRIAL, No Stings Attached!",
        type: "customer",
        headertext: "Monthly Packages",
    };

    return (
        <Fragment>
            <div>
                <section className="home-banner home-banner-business">
                    <Container>
                        <Row>
                            <Col>
                                <div className="banner-content">
                                    <h2 className="text-white">
                                        "THE MOST ELECTRIFYING WAY TO DISCOVER
                                        THE BEST DEALS THROUGHOUT{" "}
                                        <span>
                                            WORCESTER COUNTY{" "}
                                            <span>
                                                FROM THE PALM
                                                <br />
                                                OF YOUR HANDS"
                                            </span>
                                        </span>
                                    </h2>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-5">
                            <Col md={7}>
                                <div className="homebanner-content">
                                    <h2 className="text-white text-center mb-5 mt-4">
                                        Do you remember the days of cutting
                                        coupons?
                                    </h2>
                                    <p className="text-center mb-5">
                                        Or what about those old coupon books
                                        from the <br />
                                        schools..They provided BOGO deals &
                                        special offers <br />
                                        to us to go to their restaurant <br />
                                        or business. (Those were the days)
                                    </p>
                                    <p className="text-center border-txtp">
                                        But what if there was something more{" "}
                                        <br />
                                        modern{" "}
                                        <span className="red-txt">
                                            (like a mobile app)
                                        </span>{" "}
                                        that provided you
                                        <br /> the BEST DEALS in Worcester
                                        County and ONLY <br />
                                        Worcester County..
                                    </p>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="homebanner-img">
                                    <Image src={mobile1} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className="interduce-content">
                                    <h2 className="text-center text-white mb-4">
                                        INTRODUCING WOO-PONS!
                                    </h2>
                                    <div className="btn-yellow-outer">
                                        <Link onClick={goToPlanElement}>
                                            SIGN UP FOR YOUR FREE 30 DAY TRIAL{" "}
                                            <span>
                                                ( limited spot available )
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="video-sec">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="homebanner-video">
                                    <video
                                        id="banner-video"
                                        className="video-full"
                                        width="100%"
                                        height="500"
                                        src={video1}
                                        loop
                                        controls
                                    />
                                    <div className="btn-yellow-outer">
                                        <Link onClick={goToPlanElement}>
                                            I WANT WOO-PONS{" "}
                                            <span>( GET 30 DAYS FREE )</span>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="full-img-banner full-img-banner-home">
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <div className="main-title text-center mb-5">
                                    <h2 className="text-white">
                                        EXCLUSIVE PARTNERSHIP WITH LOCAL
                                        BUSINESSES
                                    </h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="paddleft-0">
                                <div className="homebanner-img">
                                    <Image src={leftimg1} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="homebanner-content">
                                    <p className="woo-p text-left">
                                        What are WOO-PONS?
                                    </p>
                                    <ul>
                                        <li>
                                            We have partnered with Worcester
                                            County
                                            <br /> business owners to offer
                                            EXCLUSIVE deals, <br /> discounts,
                                            and incentives that you can't <br />
                                            find anywhere else.
                                        </li>
                                        <li>
                                            From restaurants to entertainment to
                                            shopping, <br /> spas and more, our
                                            app is your ticket to savings <br />
                                            at hundreds of local businesses in
                                            Worcester <br />
                                            County—and it's growing every single
                                            day.
                                        </li>
                                        <li>
                                            So with these coupons in hand,
                                            you'll be able to <br />
                                            enjoy everything from 10%-50% off an
                                            order at <br />
                                            your favorite restaurant, or a BOGO
                                            special to <br />
                                            50% off a massage from your favorite
                                            masseuse. <br />
                                            Or a percentage off Home Services -
                                            who <br />
                                            doesn't need a plumber, electrician
                                            or roofer <br />
                                            they can get a special discount
                                            from..But that's <br />
                                            only the beginning.
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-100">
                            <Col md={6}>
                                <div className="homebanner-content homebanner-content2">
                                    <h2 className="red-txt">
                                        NO MORE OUTDATED COUPONS
                                    </h2>
                                    <p className="p-24">
                                        We're all about keeping things fresh.
                                    </p>
                                    <p>
                                        We understand how frustrating it can be
                                        to get a <br />
                                        coupon for something that doesn't exist
                                        anymore.
                                        <br />
                                        That's why our app is always updated
                                        with the latest
                                        <br />
                                        from your favorite local businesses.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6} className="paddright-0">
                                <div className="homebanner-img">
                                    <Image src={rightimg1} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="full-img-banner2 full-img-banner2-new">
                    <Container fluid>
                        <Row>
                            <Col md={6} className="paddleft-0">
                                <div className="homebanner-img">
                                    <Image src={grpimgs} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="rightimg-txt">
                                    <h3 className="sleek-txt">
                                        SLEEK & INTERACTIVE
                                    </h3>
                                    <ul>
                                        <li>
                                            Our app is a fun and interactive way
                                            to enjoy everything <br />
                                            that Worcester County has to offer.
                                        </li>
                                        <li>
                                            We've made sure it's super easy to
                                            browse through <br />
                                            all of the deals we have available.
                                        </li>
                                        <li>
                                            It's easy to navigate between
                                            categories and choose <br />
                                            the ones you’re interested in—fast!
                                            You can even <br />
                                            keep track of your favorites!
                                        </li>
                                        <li>
                                            It's simple, too: Just sign up for
                                            your free trial, download <br />
                                            the app, receive valuable local
                                            deals, discounts & <br />
                                            incentives - redeem them in a snap.
                                        </li>
                                    </ul>
                                    <div className="btn-yellow-outer mt-5">
                                        <Link onClick={goToPlanElement}>
                                            GET MY FREE TRIAL NOW!{" "}
                                            <span>(WOO FOR WOOPONS)</span>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="interduce-sec">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <div className="interduce-left interduce-left2 text-center">
                                    <p>
                                        WOO-PONS Is A Great Way For You To
                                        Support <br /> Local Businesses — While
                                        Also Saving Money <br />
                                        During The Rising Inflation period.
                                    </p>
                                    <p>
                                        By Using This App, You’re Helping Your
                                        Favorite <br />
                                        Local Businesses Stay In Business And
                                        Enjoy The <br />
                                        Best Of Worcester County’s Unique
                                        Offerings.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="interduce-img">
                                    <Image src={supportimg} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="founding-sec">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="title-main text-center">
                                    <h2>Woo-Pons MONTHLY Packages</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <Plans {...planProps} />

                <section className="early-sec">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="title-main text-center">
                                    <p className="get-start-ttl">
                                        Get Started With A 30 DAY FREE TRIAL,{" "}
                                        <span className="greentxt">
                                            “No Strings Attached”
                                        </span>
                                    </p>
                                    <div className="btn-yellow-outer">
                                        <Link onClick={goToPlanElement}>
                                            GET 30 DAYS FREE NOW!{" "}
                                            <span>( FREE FREE )</span>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="faq-section p-50">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="main-title mb-5">
                                    <h2 className="text-center">
                                        Frequently Asked Questions
                                    </h2>
                                </div>
                                <div className="faq-outer">
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                How many times can I use my
                                                Woo-Pon?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Woo-Pon usage is set by the
                                                business owners. Some allow 1x
                                                usage while others allow
                                                unlimited time usage. However,
                                                you can only use that specific
                                                Woo-Pon once per day.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                                Can I share my Woo-Pon account
                                                with my friends & family?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Please do not share your user
                                                name & password with anyone.
                                                Your account is specific to your
                                                mobile phone ID. If the
                                                application detects a shared
                                                account with a different log in
                                                device, it will log both
                                                accounts out & lock your
                                                account. We try to keep the cost
                                                affordable for everyone & while
                                                we do not offer a family plan
                                                yet, it is in the works.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                                What is the main difference
                                                between you & Groupon?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                We have many differences. While
                                                Groupon serves a much larger
                                                area, we are specific to
                                                Worcester County, MA. A more
                                                notable difference would be,
                                                with our platform, you don't
                                                have to purchase deals, you just
                                                search the available Woo-Pons
                                                and can redeem at your favorite
                                                local businesses. You pay a
                                                small monthly fee to use our
                                                platform, which allows us to
                                                keep the lights on &
                                                continuously scout out the best
                                                deals in Worcester County.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>
                                                What is your favorite dessert?
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Kind of a strange question, but
                                                in any case, we are huge fans of
                                                the wonderful Italian dessert
                                                called Tiramisu.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
