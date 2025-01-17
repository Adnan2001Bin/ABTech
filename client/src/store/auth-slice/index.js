import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  };
  
  
  const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        serUser: (state , action) => {}
    }
  })

export const {serUser} = authslice.actions
export default authslice.reducer;
