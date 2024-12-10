import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

const initialState = {
	dashboardData: {},
	savedWidgetDashboards: [],
};

const widgetSlice = createSlice({
	name: "widgetSlice",
	initialState,
	reducers: {
		setSavedWidgetDashboards: (state, { payload }) => {
			state.savedWidgetDashboards = payload;
			ls.set("savedWidgetDashboards", state?.savedWidgetDashboards);
		},
		setDashboardData: (state, { payload }) => {
			state.dashboardData = payload;
		},
	},
});

export const { setSavedWidgetDashboards,setDashboardData } = widgetSlice.actions;

export default widgetSlice.reducer;
