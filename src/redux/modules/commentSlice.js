import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentAPI } from "../../api/axios";
import { getDetailVideo } from "./videoSlice";

export const postComment = createAsyncThunk(
  "commentSlice/postComment",
  async (commentData, thunkAPI) => {
    const { comment, postId } = commentData;
    try {
      const result = await CommentAPI.postComment(comment, postId);
      if (result.status === 200) thunkAPI.dispatch(getDetailVideo(postId));
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const patchComment = createAsyncThunk(
  "commentSlice/patchComment",
  async (patchData, thunkAPI) => {
    const { commentId, postId, comment } = patchData;
    try {
      const result = await CommentAPI.patchComment(commentId, postId, comment);
      if (result.status === 200) thunkAPI.dispatch(getDetailVideo(postId));
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteComment = createAsyncThunk(
  "commentSlice/deleteComment",
  async (deleteData, thunkAPI) => {
    const { commentId, postId } = deleteData;
    try {
      const result = await CommentAPI.deleteComment(commentId);
      if (result.status === 200) thunkAPI.dispatch(getDetailVideo(postId));
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
const initialState = {};
const commentSlice = createSlice({
  name: "liveSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [postComment.rejected]: (state, action) => {},

    [patchComment.rejected]: (state, action) => {},

    [deleteComment.rejected]: (state, action) => {},
  },
});
export default commentSlice.reducer;
