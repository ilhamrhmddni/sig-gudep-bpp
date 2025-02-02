import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-reducers.js";

const store = configureStore({
  reducers: {
    user: userReducer,
  },
});

export default store;
