import ls from "localstorage-slim";
import React from "react";
import { HiUsers } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import LineAsset from "../../assets/svg/LineAsset.svg?react";
import Menu from "../../assets/svg/MenuItem.svg?react";
import RequestWidget from "../../assets/svg/RequestWidget.svg?react";
import styles from "./Sidebar.module.scss";

const Header = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		ls.clear();
		navigate("/");
	};
	return (
		<div className={styles.Sidebar}>
			<div className={styles.Logo}>
				<img src={Logo} alt="Logo" title="Logo" height={"100%"} width={"100%"} loading="eager" />
			</div>
			<div className={styles.LineAsset}>
				<span>
					<LineAsset />
				</span>
			</div>
			<Link to="/dashboard" className={pathname === "/dashboard" ? styles.active : ""}>
				<span>
					<Menu />
				</span>
				Dashboard
			</Link>

			<Link to="/users-dashboard" className={pathname === "/users-dashboard" ? styles.active : ""}>
				<span>
					<HiUsers />
				</span>
				Users Dashboard
			</Link>

			<Link to="/widget-requests" className={pathname === "/widget-requests" ? styles.active : ""}>
				<span>
					<RequestWidget />
				</span>
				Widget Requests
			</Link>

			<div className={styles.SidebarItem} onClick={handleLogout}>
				<span>
					<IoMdLogOut />
				</span>
				Logout
			</div>
		</div>
	);
};

export default Header;
