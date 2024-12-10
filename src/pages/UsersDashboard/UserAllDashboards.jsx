import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardDemo } from "../../assets";
import ArrowBackYellow from "../../assets/svg/ArrowBackYellow.svg?react";
import More from "../../assets/svg/More.svg?react";
import Send from "../../assets/svg/Send.svg?react";
import styles from "./UserAllDashboards.module.scss";
import UserProfilePopup from "./UserProfilePopup";

const UserAllDashboards = () => {
	const navigate = useNavigate();
	const [openMenuIndex, setOpenMenuIndex] = useState(null);
	const handleOpenMenu = (index) => {
		index === openMenuIndex ? setOpenMenuIndex(null) : setOpenMenuIndex(index);
	};

	//open user profile
	const [openUserProfile, setOpenUserProfile] = useState(false);
	const handleOpenUserProfile = () => {
		setOpenUserProfile(true);
	};

	const { data } = useLocation()?.state;

	const { user } = useSelector((state) => state.user);

	return (
		<div>
			{openUserProfile && <UserProfilePopup {...{ setOpenUserProfile }} />}

			<div className={styles.UserAllDashboards}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Users Widget Requests </h2>
						<p>Hello , 👋{user?.name} Welcome to Dashboard</p>
					</div>
					<div className={styles.Right}>
						<div className={styles.Back} onClick={() => navigate("/users-dashboard")}>
							<ArrowBackYellow />
							<p>Back</p>
						</div>
					</div>
				</div>
				<div className={styles.Left}>
					{data?.dashboards?.map((item, i) => (
						<div key={i} className={styles.DashboardCard}>
							<div className={styles.Top}>
								<div className={styles.Profile}>
									<img src={data?.createdBy?.profilePic} alt="" />
									<div className={styles.Details}>
										<h3>{item?.title}</h3>
										<p>@{data?.createdBy?.name || "username1"}</p>
									</div>
								</div>
								<div className={styles.Buttons}>
									<span className={styles.Menu} onClick={() => handleOpenMenu(i)}>
										<More />
										<div
											className={`${styles.SubMenu} ${i === openMenuIndex ? styles.Open : ""}`}
											onClick={(e) => e.stopPropagation()}>
											<p onClick={() => navigate("/manage-user", { state: { data, activeDashboard: item } })}>
												<FiEdit />
												Edit User Dashboard
											</p>
										</div>
									</span>
									<span>
										<Send />
									</span>
								</div>
							</div>
							<div className={styles.Image}>
								<img src={DashboardDemo} alt=" " height={"100%"} width={"100%"} title=" " loading="lazy" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserAllDashboards;
