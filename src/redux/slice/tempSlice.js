import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addChartPopup: false,
	existingCharts: [],
	reloadDashboardData: 0, //for fetch the updated data after adding/editing a new chart

	openLoadingPopup: false,
};

const tempSlice = createSlice({
	name: "tempSlice",
	initialState,
	reducers: {
		setOpenLoadingPopup: (state, { payload }) => {
			state.openLoadingPopup = payload;
		},
	},
});

export const { setOpenLoadingPopup } = tempSlice.actions;

export default tempSlice.reducer;
