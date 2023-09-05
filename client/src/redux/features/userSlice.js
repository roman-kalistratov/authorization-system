import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    remember: false,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("accessToken");
      } else {
        if (action.payload.token)
          localStorage.setItem("accessToken", action.payload.token);
      }

      state.user = action.payload;
    }    
  },
});

export const {
  setUser  
} = userSlice.actions;

export default userSlice.reducer;
