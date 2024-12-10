import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrDrag } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackYellow from "../../assets/svg/ArrowBackYellow.svg?react";
import Layout from "../../assets/svg/Layout.svg?react";
import DataTable from "../DataTable/DataTable";
import AddWidgetPopup from "./AddWidgetPopup";
import styles from "./ManageUser.module.scss";

const ManageUser = () => {
	const [openAddWidgetPopup, setOpenAddWidgetPopup] = useState(false);
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.user);

	const [gridWidth, setGridWidth] = useState(window.innerWidth * 0.8);

	useEffect(() => {
		// Function to calculate 80vw based on window width
		const updateGridWidth = () => {
			setGridWidth(window.innerWidth * 0.8);
		};

		updateGridWidth();

		window.addEventListener("resize", updateGridWidth);
		return () => window.removeEventListener("resize", updateGridWidth);
	}, []);

	const [openDropDown, setOpenDropDown] = useState(false);
	const toggleDropdown = () => {
		setOpenDropDown(!openDropDown);
	};

	//fetch dashboard data
	const { data, activeDashboard } = useLocation()?.state;

	const layout = data?.dashboards?.map((item, index) => ({
		i: `dashboard-${index}`, // Must match the `key`
		x: 0, // Adjust layout positioning logic
		y: index * 3,
		w: 12,
		h: 3,
	}));
	return (
		<>
			{openAddWidgetPopup && <AddWidgetPopup {...{ setOpenAddWidgetPopup, activeDashboard }} />}
			<div className={styles.ManageUser}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Users Widget Requests </h2>
						<p>Hello , 👋{user?.name} Welcome to Dashboard</p>
					</div>
					<div className={styles.Right}>
						<div className={styles.EditLayout} onClick={() => setOpenAddWidgetPopup(true)}>
							<Layout />
							<p>Edit layout</p>
						</div>
						<div
							className={styles.Back}
							onClick={() =>
								navigate("/user-all-dashboards", {
									state: { data },
								})
							}>
							<ArrowBackYellow />
							<p>Back</p>
						</div>
						{/* <button>
							<PlusYellow />
						</button> */}
					</div>
				</div>

				<div className={styles.Row2}>
					<GridLayout
						className="layout"
						layout={layout}
						cols={12}
						rowHeight={120}
						width={gridWidth}
						draggableHandle=".dragHandle">
						{activeDashboard?.widgets?.map((item, i) => (
							<div key={`dashboard-${i}`} className={styles.gridItem}>
								<div className={styles.ActionButtons}>
									<button className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
										<GrDrag />
									</button>
									<button className={styles.Actions}>
										<BsThreeDotsVertical onClick={toggleDropdown} />
										{openDropDown && (
											<div className={`${styles.Menu} ${openDropDown ? styles.Open : ""}`}>
												<p onClick={() => navigate("/data-table")}>View All Details</p>
											</div>
										)}
									</button>
								</div>

								{item === "ListAgent" ? <DataTable pagination={"hide"} /> : <p style={{ width: "70rem" }}>{item}</p>}
							</div>
						))}

						{/* <div key="box1" className={styles.gridItem}>
							<div className={styles.ActionButtons}>
								<button className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
									<GrDrag />
								</button>
								<button className={styles.Actions}>
									<BsThreeDotsVertical onClick={toggleDropdown} />
									<div className={`${styles.Menu} ${openDropDown ? styles.Open : ""}`}>
										<p onClick={() => navigate("/data-table")}>View All Details</p>
									</div>
								</button>
							</div>
						</div> */}
						{/* <div key="box2" className={styles.gridItem}>
							<div className={styles.ActionButtons}>
								<button className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
									<GrDrag />
								</button>
							</div>
						</div>
						<div key="box3" className={styles.gridItem}>
							{" "}
							<div className={styles.ActionButtons}>
								<button className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
									<GrDrag />
								</button>
							</div>
						</div>

						<div key="box4" className={styles.gridItem}>
							{" "}
							<div className={styles.ActionButtons}>
								<button className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
									<GrDrag />
								</button>
							</div>
						</div>
						<div key="box5" className={styles.gridItem}>
							{" "}
							<div className={styles.ActionButtons}>
								<button className={`${styles.dragHandleButton} dragHandle`} style={{ cursor: "move" }}>
									<GrDrag />
								</button>
							</div>
						</div> */}
					</GridLayout>
				</div>
			</div>
		</>
	);
};

export default ManageUser;
