import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: { 
    appState: appStateSlice,
    user: userSlice
  },
});

export default store;
