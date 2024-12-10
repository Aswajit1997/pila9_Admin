import { configureStore } from "@reduxjs/toolkit";
import tempSlice from "./slice/tempSlice";
import widgetSlice from "./slice/widgetSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
	reducer: {
		temp: tempSlice,
		user: userSlice,
		widget: widgetSlice,
	},
});

export default store;
