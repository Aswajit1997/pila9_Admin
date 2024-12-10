import { lazy, Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./assets/scss/Styles.module.scss";
import { clearCacheData } from "./components/Hooks/clearCacheData";

import ls from "localstorage-slim";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/Hooks/ScrollToTop";
import LoadingPopup from "./components/Loading/LoadingPopup";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/Topbar/TopBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

import { fetchUserFromLocal } from "./redux/slice/userSlice";
import DataTable from "./pages/DataTable/DataTable";

const UsersDashboard = lazy(() => import("./pages/UsersDashboard/UsersDashboard"));
const ManageWidgets = lazy(() => import("./pages/ManageWidgets/ManageWidgets"));
const WidgetRequests = lazy(() => import("./pages/ManageWidgets/WidgetRequests"));
const ManageUser = lazy(() => import("./pages/UsersDashboard/ManageUser"));
const UserAllDashboards = lazy(() => import("./pages/UsersDashboard/UserAllDashboards"));

const App = () => {
	const location = useLocation();
	clearCacheData();

	return (
		<>
			<ScrollToTop />

			<ToastContainer
				position="top-center"
				autoClose={3000}
				limit={4}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover
			/>

			{/* <AnimatePresence> */}
			<Routes location={location} key={location.pathname}>
				{/* <Route path="*" element={<Page404 />} /> */}

				<Route path="/" element={<Login />} />
				<Route element={<Wrapper />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/users-dashboard" element={<UsersDashboard />} />
					<Route path="/user-all-dashboards" element={<UserAllDashboards />} />
					<Route path="/widget-requests" element={<WidgetRequests />} />
					<Route path="/manage-user-widgets" element={<ManageWidgets />} />
					<Route path="/manage-user" element={<ManageUser />} />
					<Route path="/data-table" element={<DataTable />} />
				</Route>
			</Routes>
			{/* </AnimatePresence> */}
		</>
	);
};

export default App;

const Wrapper = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!ls.get("Pilar9_Admin_Token")) navigate("/");
	}, []);

	useEffect(() => {
		dispatch(fetchUserFromLocal());
	}, []);

	const { pathname } = useLocation();
	const { openLoadingPopup } = useSelector((state) => state.temp);
	return (
		<div className={styles.Wrapper}>
			<Suspense fallback={<LoadingIndicator />}>
				<Sidebar />
				{openLoadingPopup && <LoadingPopup />}
				<div className={styles.MainWrapper}>
					{pathname !== "/manage-user" && pathname !== "/user-all-dashboards" && pathname !== "/manage-user-widgets" && (
						<TopBar />
					)}

					<div
						className={`${styles.Main} ${
							pathname === "/manage-user" || pathname !== "/user-all-dashboards" ? styles.FullHeight : ""
						}`}>
						<Outlet />
					</div>
				</div>
			</Suspense>
		</div>
	);
};
