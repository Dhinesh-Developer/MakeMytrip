import { configureStore, createSlice } from "@reduxjs/toolkit";

const getuserfromlocalstorage = () => {
  if (typeof window !== "undefined") {
    const storeduser = localStorage.getItem("user");
    return storeduser ? JSON.parse(storeduser) : null;
  }
  return null;
};

const saveuserlocalstorage = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

const initialState = {
  user: getuserfromlocalstorage(), // ✅ FIXED
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveuserlocalstorage(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
