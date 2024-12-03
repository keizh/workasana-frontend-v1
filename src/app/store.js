import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import infoSlice from "../features/infoSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    info: infoSlice.reducer,
  },
});

export default store;
