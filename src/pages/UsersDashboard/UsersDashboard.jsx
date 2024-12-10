import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../components/Hooks/axios";
import { formatTimestamp } from "../../components/utils/HelperFunctions";
import { setOpenLoadingPopup } from "../../redux/slice/tempSlice";
import styles from "./UsersDashboard.module.scss";

const UsersDashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [supportCount, setSupportCount] = useState(0);

	//get users dashboards

	const [dashboards, setDashboards] = useState([]);
	const [reload, setReload] = useState(false);
	useEffect(() => {
		dispatch(setOpenLoadingPopup(true));
		axios
			.get(`dashboard?page=${page}&limit=${limit}`)
			.then(({ data }) => {
				// console.log(data);
				setDashboards(data?.data);
				setSupportCount(data?.totalUsers);
			})
			.catch((err) => {
				// console.log(err);
				toast.error(err?.response?.data?.message || "error loading dashboard Data..");
			})
			.finally(() => dispatch(setOpenLoadingPopup(false)));
	}, [reload, page, limit]);

	const { user } = useSelector((state) => state.user);
	return (
		<div className={styles.UsersDashboard}>
			<div className={styles.DashboardTable}>
				<div className={styles.Filters}>
					<div className={styles.SearchWrapper}>
						<BiSearch />
						<input type="search" name="" id="" placeholder="Search for User" />
					</div>
				</div>
				<div className={styles.Headings}>
					<div>User Name</div>
					<div>Email</div>
					<div>Joining Date</div>
					<div>No. of Dashboards</div>
					<div>View</div>
				</div>
				<div className={styles.SupportCards}>
					{dashboards?.map((data, i) => {
						return (
							<div className={styles.Card} key={i}>
								<div className={styles.NamePic}>
									<img src={data?.createdBy?.profilePic} alt=" " height={"100%"} width={"100%"} loading="lazy" title=" "/>
									{data?.createdBy?.name}
								</div>
								<div>{data?.createdBy?.email}</div>
								<div>{formatTimestamp(data?.createdBy?.createdAt)}</div>
								<div>{data?.dashboards?.length}</div>
								<div>
									<BsEyeFill
										onClick={() =>
											navigate(`/user-all-dashboards`, {
												state: { data },
											})
										}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div className={styles.SupportFooter}>
					<p>{`Showing ${dashboards?.length} of ${supportCount} records in page ${page} `}</p>
					<div className={styles.pageButtons}>
						<button
							className={styles.leftArrow}
							disabled={page === 1}
							onClick={() => {
								setPage(page - 1);
							}}>
							{<FaArrowLeft />}
						</button>

						<p>{page}</p>

						<button
							disabled={page === Math.ceil(supportCount / limit) || Math.ceil(supportCount / limit) < 2}
							onClick={() => {
								setPage(page + 1);
							}}>
							{<FaArrowRight />}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersDashboard;
