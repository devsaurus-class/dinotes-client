import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userObj = JSON.parse(localStorage.getItem('user'));
const isLoggedIn = userObj ? true : false;

const initialState = {
  isLoggedIn: isLoggedIn,
  user: userObj?.user,
  status: 'idle',
  error: null
};

export const register = createAsyncThunk('users/register', async (credential) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential)
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, requestOptions);

  if (response.ok) {
    return response;
  } else {
    throw Error(response.statusText);
  }
});

export const login = createAsyncThunk('users/login', async (credential) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential)
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, requestOptions);

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } else {
    throw Error(response.statusText);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    statusReset(state, action) {
      state.status = 'idle';
    },
    logout(state, action) {
      localStorage.removeItem('user');
      state.isLoggedIn = false;
      state.user = null;
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [register.pending]: (state, action) => {
      state.status = 'loading';
    },
    [register.fulfilled]: (state, action) => {
      state.status = 'succeeded';
    },
    [register.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const { statusReset, logout } = userSlice.actions;

export default userSlice.reducer;
