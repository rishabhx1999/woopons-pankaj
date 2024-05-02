import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

import Plan from "./Plan";
import Detail from "./Detail";

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({});

const MainView = (props) => {
    const { plans, nextUrl, right, headertext, buttonText, type } = props;

    return (
        <Fragment>
            <Container>
                <Row>
                    {right ? (
                        <>
                            <Plan {...props} />
                        </>
                    ) : (
                        <>
                            <Plan {...props} />
                        </>
                    )}
                </Row>
            </Container>
        </Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
