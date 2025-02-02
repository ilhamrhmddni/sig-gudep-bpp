import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSelf: [],
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSelf: (state, action) => {
      state.userSelf = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUserSelf, setUsers } = userSlice.actions;
export default userSlice.reducer;
