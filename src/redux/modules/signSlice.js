import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignAPI } from "../../api/axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const dupEmailCheck = createAsyncThunk(
  "signSlice/dupEmailCheck",
  async (email, thunkAPI) => {
    const response = await SignAPI.dupEmailCheck(email);
    if (response.status === 200) {
      const fulfilledMsg = response.data.message;
      return thunkAPI.fulfillWithValue(fulfilledMsg);
    } else {
      const errorMsg = response.response.data.errorMessage;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const signUp = createAsyncThunk(
  "signSlice/signUp",
  async (formData, thunkAPI) => {
    const response = await SignAPI.signUp(formData);
    if (response.status === 200) {
      const fulfiledMsg = response.data.message;
      return thunkAPI.fulfillWithValue(fulfiledMsg);
    } else {
      const errorMsg = response.response.data.errorMessage;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const logIn = createAsyncThunk(
  "signSlice/logIn",
  async (loginData, thunkAPI) => {
    const response = await SignAPI.logIn(loginData);
    if (response.status === 200) {
      const fulfiledMsg = "로그인 성공";
      return thunkAPI.fulfillWithValue(fulfiledMsg);
    } else {
      const errorMsg = response.response.data.errorMessage;
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const auth = createAsyncThunk(
  "signSlice/auth",
  async (payload, thunkAPI) => {
    const response = await SignAPI.auth();

    if (response.status === 200) {
      return thunkAPI.fulfillWithValue();
    } else {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const kakaoLogin = createAsyncThunk(
  "signSlice/kakaoLogin",
  async (code, thunkAPI) => {
    try {
      const response = await SignAPI.kakaoLogin(code);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue();
      } else {
        return thunkAPI.rejectWithValue("kakao error");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("kakao error");
    }
  }
);

const initialState = {
  isLogedIn: false,
  isSignUp: false,
  error: false,
  errorMsg: "",
  fulfiledMsg: "",
  dupCheck: false,
};

const signSlice = createSlice({
  name: "introSlice",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.isLogedIn = false;
      cookie.remove("token", { path: "/" });
    },
  },
  extraReducers: {
    [dupEmailCheck.pending]: (state) => {},
    [dupEmailCheck.fulfilled]: (state, action) => {
      state.dupCheck = true;
      state.fulfiledMsg = action.payload;
    },
    [dupEmailCheck.rejected]: (state, action) => {
      state.dupCheck = false;
      state.error = true;
      state.errorMsg = action.payload;
    },

    [signUp.pending]: (state) => {},
    [signUp.fulfilled]: (state, action) => {
      state.isSignUp = true;
      state.fulfiledMsg = action.payload;
    },
    [signUp.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
    },

    [logIn.pending]: (state) => {},
    [logIn.fulfilled]: (state, action) => {
      state.isLogedIn = true;
      state.fulfiledMsg = action.payload;
    },
    [logIn.rejected]: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
    },

    [auth.pending]: (state) => {},
    [auth.fulfilled]: (state, action) => {
      state.isLogedIn = true;
    },
    [auth.rejected]: (state, action) => {
      state.error = false;
      state.isLogedIn = false;
      state.errorMsg = action.payload;
    },

    [kakaoLogin.pending]: (state) => {},
    [kakaoLogin.fulfilled]: (state, action) => {
      state.isLogedIn = true;
    },
    [kakaoLogin.rejected]: (state, action) => {
      state.error = false;
      state.errorMsg = action.payload;
    },
  },
});

export default signSlice.reducer;
export const { logOut } = signSlice.actions;
