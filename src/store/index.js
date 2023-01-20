import { configureStore } from "@reduxjs/toolkit";
import brewSlice from "./brew-slice";

const store = configureStore({
  reducer: { brew: brewSlice.reducer },
});

export default store;
