import React, { Fragment } from "react";
import Header from "../includes/Header";
import Footer from "../includes/Footer";

const FrontendLayout = ({ children, mobile }) => (
    <Fragment>
        {!mobile ? (
            <div className="header">
                <Header />
            </div>
        ) : null}

        {children}

        {!mobile ? (
            <div className="footer">
                <Footer />
            </div>
        ) : null}
    </Fragment>
);

export default FrontendLayout;
