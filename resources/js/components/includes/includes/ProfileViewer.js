import React, { useState, useEffect, createRef, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown, NavItem, Image } from "react-bootstrap";
import avtarPic from "../../../assets/images/user.png";
import { prefix } from "./../../../constants/prefix.js";

import { getBackgroundColor, createImageFromInitials } from "../../Utils";

const ProfileViewer = (props) => {
    const { currentUser, onSignOut } = props;
    const [profile, setProfile] = useState(avtarPic);
    const [userName, setUserName] = useState("");
    const [showWoopon, setShowWoopon] = useState(false);
    const dropper = createRef();

    const triggerDropdown = () => {
        if (dropper && dropper.current) {
            if (dropper.current.firstChild) {
                dropper.current.firstChild.click();
            }
        }
    };

    const submitLogout = () => {
        onSignOut();
    };

    useEffect(() => {
        if (currentUser && currentUser.email) {
            setUserName(currentUser.name);

            // const _dashboard_link = "/"+prefix[currentUser.roleId]+'/dashboard';
            //
            // setdashboardlink(_dashboard_link);
            if (currentUser.avatar) {
                // console.log(currentUser)
                setProfile(currentUser.avatar);
            } else {
                setProfile(
                    createImageFromInitials(
                        200,
                        currentUser.name,
                        getBackgroundColor()
                    )
                );
            }

            if (currentUser.roleId == 2 && currentUser.status == 1) {
                setShowWoopon(true);
            }
        }
    }, [currentUser]);

    return (
        <Fragment>
            {currentUser && currentUser.email ? (
                <Fragment>
                    <div className="profile-header">
                        <Image
                            src={profile}
                            alt="profile-pic"
                            onClick={triggerDropdown}
                            height={30}
                        />
                        <NavDropdown
                            ref={dropper}
                            title={userName}
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item
                                activeclassname="active"
                                as={NavLink}
                                to="/user/myaccount"
                            >
                                My account
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            {showWoopon ? (
                                <>
                                    <NavDropdown.Item
                                        activeclassname="active"
                                        as={NavLink}
                                        to="/business/coupons"
                                    >
                                        My Woopons
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </>
                            ) : null}

                            <NavDropdown.Item
                                activeclassname="active"
                                as={NavLink}
                                to="/user/forgotpassword"
                            >
                                Change / Forgot password
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={submitLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Fragment>
            ) : (
                <Fragment />
            )}
        </Fragment>
    );
};

export default ProfileViewer;
