import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { client, VideoAPI } from "../../api/axios";

export const searchTag = createAsyncThunk(
  "videoSlice/searchTag",
  async (tag, thunkAPI) => {
    try {
      const result = await VideoAPI.searchTag(tag);
      if (result.status === 200)
        return thunkAPI.fulfillWithValue(result.data.posts);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const searchTitle = createAsyncThunk(
  "videoSlice/searchTitle",
  async (keyword, thunkAPI) => {
    try {
      const result = await VideoAPI.sarchTitle(keyword);
      if (result.status === 200)
        return thunkAPI.fulfillWithValue(result.data.posts);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const postVideo = createAsyncThunk(
  "videoSlice/postVideo",
  async (formData, thunkAPI) => {
    try {
      const response = await VideoAPI.postVideo(formData);
      if (response.status === 200) {
        const result = await client.get(`/post?lastId=0`);
        return thunkAPI.fulfillWithValue(result.data.posts);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllVideo = createAsyncThunk(
  "videoSlice/getAllVideo",
  async (getAll, thunkAPI) => {
    try {
      const result = await VideoAPI.getAllVideo(getAll);
      if (result.status === 200) {
        return thunkAPI.fulfillWithValue(result.data.posts);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getDetailVideo = createAsyncThunk(
  "videoSlice/getDetailVideo",
  async (videoId, thunkAPI) => {
    try {
      const result = await VideoAPI.getDetailVideo(videoId);
      if (result.status === 200) {
        return thunkAPI.fulfillWithValue(result.data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteVideo = createAsyncThunk(
  "videoSlice/deleteVideo",
  async (videoId, thunkAPI) => {
    try {
      const response = await VideoAPI.deleteVideo(videoId);
      if (response.status === 200) {
        await thunkAPI.dispatch(getAllVideo());
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const patchVideo = createAsyncThunk(
  "videoSlice/patchVideo",
  async (updateData, thunkAPI) => {
    const { videoId, updatement } = updateData;
    try {
      const response = await VideoAPI.patchVideo(videoId, updatement);
      if (response.status === 200) {
        await thunkAPI.dispatch(getDetailVideo(videoId));
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  allVideos: null,
  detailViedeo: null,
  searchedVideo: null,
  searchedFilterVideo: null,
};
const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  reducers: {
    initSearch: (state, payload) => {
      state.searchedVideo = null;
    },
    filterView: (state, payload) => {
      state.searchedVideo = state.searchedVideo?.sort(
        (a, b) => b.view - a.view
      );
      state.searchedFilterVideo = null;
    },
    fitlerTitle: (state, payload) => {
      state.searchedVideo = state.searchedVideo?.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        else return 0;
      });
      state.searchedFilterVideo = null;
    },
    detailFilterDay: (state, payload) => {
      state.searchedFilterVideo = state.searchedVideo?.filter(
        (el) => new Date(el.createdAt).getDate() === new Date().getDate()
      );
    },
    detailFilterMonth: (state, payload) => {
      state.searchedFilterVideo = state.searchedVideo?.filter(
        (el) => new Date(el.createdAt).getMonth() === new Date().getMonth()
      );
    },
    detailFilterYear: (state, payload) => {
      state.searchedFilterVideo = state.searchedVideo?.filter(
        (el) => new Date(el.createdAt).getYear() === new Date().getYear()
      );
    },
  },
  extraReducers: {
    [searchTag.fulfilled]: (state, action) => {
      state.searchedVideo = action.payload;
    },
    [searchTag.rejected]: (state, action) => {},

    [searchTitle.fulfilled]: (state, action) => {
      state.searchedVideo = action.payload;
      state.searchedFilterVideo = null;
    },
    [searchTitle.rejected]: (state, action) => {},

    [postVideo.fulfilled]: (state, action) => {
      state.allVideos = action.payload;
    },
    [postVideo.rejected]: (state, action) => {
      state.msg = action.payload.errorMessage;
      state.isValid = false;
    },

    [getAllVideo.fulfilled]: (state, action) => {
      if (state.allVideos === null) {
        state.allVideos = action.payload;
      } else if (action.payload.length > 0) {
        if (
          state.allVideos[state.allVideos?.length - 1].postId !==
          action.payload[action.payload.length - 1].postId
        ) {
          state.allVideos = [...state.allVideos, ...action.payload];
        }
      }
    },
    [getAllVideo.rejected]: (state, action) => {},

    [getDetailVideo.fulfilled]: (state, action) => {
      state.detailViedeo = action.payload.post;
    },
    [getDetailVideo.rejected]: (state, action) => {},

    [deleteVideo.rejected]: (state, action) => {},

    [patchVideo.rejected]: (state, action) => {},
  },
});
export const {
  initSearch,
  filterView,
  fitlerTitle,
  detailFilterDay,
  detailFilterMonth,
  detailFilterYear,
} = videoSlice.actions;
export default videoSlice.reducer;
