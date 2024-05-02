import React, { Fragment,useEffect,useState} from "react";
import { connect } from "react-redux";
import { Image } from 'react-bootstrap';

import { useLocation, NavLink } from "react-router-dom";
import { ImSwitch } from 'react-icons/im';
// import agent from "../../agent";

import { PRIMARY_MENU, CHILD_MENU } from './../../constants/sideBar';
import { prefix } from './../../constants/prefix.js';
import SidebarChild from './includes/SidebarChild';
import logo from '../../assets/images/white-logo.png';
import dflUserPic from '../../assets/images/avtar.jpg';

import ChangePasswordModal from '../Admin/ChangePassword';
import LogoutModal from '../Admin/Logout';

import {getBackgroundColor,createImageFromInitials} from '../Utils'

import {
   PAGE_ATTR,
   LOGOUT
} from "../../constants/actionTypes";

const mapStateToProps = (state) => {
	return {
		...state,
		currentUser: state.common.currentUser,
		currentAdminUser: state.admin.currentAdminUser,
		clubData: state.common.clubData,
		authError: state.common.authError,
	}
};

const mapDispatchToProps = (dispatch) => ({
	setPageHeading: (title) => 
        dispatch({ type: PAGE_ATTR, pageheading: title }),
   onSignOut: () =>  dispatch({ type: LOGOUT })
    
});

const Header = (props) => {
	const {clubData, currentUser, currentAdminUser,setPageHeading,authError, inProgress, onSignOut } = props;
	let roleId  = currentAdminUser && currentAdminUser.roleId ? currentAdminUser.roleId : currentUser.roleId;

	roleId = parseInt(roleId);



	const [userPrflPic, setUserPrflPic] = useState(dflUserPic);
	const [userFullName, setUserFullName] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const  [account_status, setAccountStatus] = useState(false);

	const  [menu_data, setMenuData] = useState([]);

	const [show, setShow] = useState(false);
	const [showLogout, setShowLogout] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleLogoutClose = () => setShowLogout(false);
  	const handlecPassShow = () => setShow(true);
	// let roleId = 1;

	//assigning location variable
   const location = useLocation();

   //destructuring pathname from location
   const { pathname } = location;

   const submitLogout = () => {
		onSignOut();
	}
     
   useEffect(() => {
	   if (authError) {
	    window.location.reload();
	   }
  	}, [authError]);

  	useEffect(() => {
	    // debugger
	    // console.log("admn")
	    // console.log(currentAdminUser)
	    if (currentAdminUser) { 
	    	if (currentAdminUser.avatar) {
	    		setUserPrflPic(currentAdminUser.avatar)
	    	} else {
	    		setUserPrflPic(createImageFromInitials(500, currentAdminUser.name, getBackgroundColor()))
	    	}
	    	setUserFullName(currentAdminUser.name)
	    	setUserEmail(currentAdminUser.email)
	    	
	    } else{ 
	    	setUserPrflPic(dflUserPic)
	    	setUserFullName("")
	    	setUserEmail("") 
	    }

  	}, [currentAdminUser]);

  	useEffect(() => {
	    // debugger
	    // console.log("crnt")
	    // console.log(currentUser)
	    if (currentUser) { 
	    	// debugger
	    	if (currentUser.avatar) {
	    		setUserPrflPic(currentUser.avatar)
	    	} else {
	    		setUserPrflPic(dflUserPic)
	    	}
	    	setUserFullName(currentUser.name)
	    	setUserEmail(currentUser.email)
	    } else{ 
	    	setUserPrflPic(dflUserPic)
	    	setUserFullName("")
	    	setUserEmail("") 
	    }

  	}, [currentUser]);


	useEffect(() => {
		if(pathname){
			const section = document.querySelector( '.dashboard-bar-column' );
			section.scrollTo(0, 0);
		}
	    
	}, [pathname]);

	let changePassProps = {
		show,
		handleClose,
		inProgress
	}

	let logoutProps = {
		showLogout,
		handleLogoutClose,
		inProgress,
		submitLogout
	}

	return (
      	<div className="sidebar-main">
			<div className="top-logo">
				<NavLink to="/admin/dashboard"><Image src={logo} alt="" /></NavLink>
			</div>

			<div className="profile-sidebar d-flex align-items-center">
				<Image src={userPrflPic} alt="" />
				<div className="profile-title">
					<h4>{userFullName}</h4>
					<p>{userEmail}</p>
				</div>
			</div>

			<div className="route-links">
				<ul className="links-list">
					{

						PRIMARY_MENU.map((menu, i) => {

							let activeLink = false;

							let linkk = menu.link;

							if(menu.prefix){
								if(roleId) {
									if(!linkk.includes("/"+prefix[roleId])){
			                            linkk = "/"+prefix[roleId]+linkk;
			                        }
									
								}
							}

							if(linkk == pathname){
								activeLink = true;
							}
							
							let acessor = menu.accessor;
							let showMenu = false;
							if(acessor == 'all') {
								showMenu = true;
							} else if(typeof acessor == 'object') {
								if(roleId && acessor.indexOf(roleId) !== -1) {
									showMenu = true;
								}
							}

							return (
								<Fragment key={menu.id}>
									{showMenu ? (
										<SidebarChild handlecPassShow={handlecPassShow} menu={menu} linkk={linkk} activeLink={activeLink} setPageHeading={setPageHeading} pathname={pathname} childMenu={(menu.childMenus)?menu.childMenus:[]} roleId={roleId} />	
									) : (
										<Fragment />
									)}
								</Fragment>
							)
						})
					}
				</ul>
			</div>
			<div className="logout-btn">
				<a onClick={(e) => setShowLogout(true)}><ImSwitch />Logout</a>
			</div>

			<ChangePasswordModal {...changePassProps}/>
			<LogoutModal {...logoutProps}/>
      	</div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);

