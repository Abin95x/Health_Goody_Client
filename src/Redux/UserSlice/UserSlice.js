import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
  name:"user",
  initialState:{
    // token:"",
    user:null
  },
  reducers:{
    setUser:(state,action) => {
    //   state.token = action.payload.token
      state.user = action.payload.user
    },
    userLogout:(state) => {
      state.user = null
    //   state.token = ""
    }
  }
})
export const {setUser,userLogout} = userSlice.actions
export default userSlice.reducer