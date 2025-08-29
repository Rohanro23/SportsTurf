
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userName: "",
  newuserName:""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userName: (State, action) => {
      State.userName = action.payload;
    },
     userLoggedIn:(state,action)=>{
      state.isLoggedIn=action.payload;
     },
     newuserName:(state,action)=>{
      state.newuserName=action.payload
     }

  },
});

export const { userLoggedIn, userName,newuserName } = userSlice.actions;
export default userSlice.reducer;
