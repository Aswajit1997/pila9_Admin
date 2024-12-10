import { createSlice } from "@reduxjs/toolkit";
import ls from "localstorage-slim";

const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload || {};
			ls.set("superAdmin", payload);
		},
		fetchUserFromLocal: (state, { payload }) => {
			state.user = ls.get("superAdmin") || {};
		},
	},
});

export const { setUser, fetchUserFromLocal } = userSlice.actions;

export default userSlice.reducer;
