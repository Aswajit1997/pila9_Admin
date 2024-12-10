import React, { useState } from "react";
import { CrossButton, PlusButton } from "../../assets/svg/SvgIndex";
import styles from "./AddWidgetPopup.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../components/Hooks/axios";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";

const AddWidgetPopup = ({ setOpenAddWidgetPopup, activeDashboard }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [title, setTitle] = useState(activeDashboard?.title);
	const [widgetButtons, setWidgetButtons] = useState(["ListAgent", "Dimensions", "Segments", "Time", "Filter"]);
	const [selectedWidgets, setSelectedWidgets] = useState(activeDashboard?.widgets || []);

	// Add widget to selectedWidgets
	const handleAddWidget = (widget) => {
		setSelectedWidgets((prev) => [...prev, widget]);
	};

	// Remove widget from selectedWidgets
	const handleRemoveWidget = (widget) => {
		setSelectedWidgets((prev) => prev.filter((item) => item !== widget));
	};

	const handleBuildChart = () => {
		dispatch(setOpenLoadingPopup(true));
		axios
			.put(`dashboard/update/${activeDashboard._id}`, { title, widgets: selectedWidgets })
			.then(({ data }) => {
				console.log(data);

				navigate("/users-dashboard");
				setOpenAddWidgetPopup(false);
			})
			.catch((err) => {
				// console.log(err);
				toast.error(err?.response?.data?.message || "Error updating dashboard..");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	};

	console.log(activeDashboard);
	return (
		<div className={styles.AddWidgetPopup} onClick={() => setOpenAddWidgetPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Top}>
					<div className={styles.Left}>
						<h2>Title of the Dashboard</h2>
						<p>{title}</p>
					</div>
					<div className={styles.Right}>
						<button onClick={() => setOpenAddWidgetPopup(false)}>Discard</button>
						<button onClick={handleBuildChart}>Build</button>
					</div>
				</div>

				{/* Widget Buttons */}
				<div className={styles.WidgetButtons}>
					{widgetButtons.map((item, index) => (
						<div key={index} className={styles.WidgetBtn}>
							<p>{item}</p>
							{selectedWidgets.includes(item) ? (
								<span className={styles.CrossButton} onClick={() => handleRemoveWidget(item)}>
									<img src={CrossButton} alt=" " height={"100%"} width={"100%"} title="Remove" loading="lazy" />
								</span>
							) : (
								<span className={styles.Show} onClick={() => handleAddWidget(item)}>
									<img src={PlusButton} alt=" " height={"100%"} width={"100%"} title="Add" loading="lazy" />
								</span>
							)}
						</div>
					))}
				</div>

				{/* Selected Widgets */}
				<div className={styles.AllWidgets}>
					{selectedWidgets.map((item, i) => (
						<div key={i} className={styles.WidgetBox}>
							{/* {item === "ListAgent" && <DataTable />} */}
							{item} Widget
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AddWidgetPopup;
