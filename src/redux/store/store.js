import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../modules/commentSlice";
import signSlice from "../modules/signSlice";
import videoSlice from "../modules/videoSlice";

const store = configureStore({
  reducer: { videoSlice, signSlice, commentSlice },
});

export default store;
