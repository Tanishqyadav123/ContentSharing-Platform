import {createSlice} from '@reduxjs/toolkit' 

const userSlice = createSlice({
    
      name : "user",
      initialState : {
         currentuser : null,
         Alltweets : null
      },
      reducers : {
         setCurrentUser : (state , action) =>{
            console.log(action.payload)
             state.currentuser = action.payload
             console.log(state.currentuser)
         },
         setAllTweets : (state , action) =>{
             state.Alltweets = action.payload
             console.log(state.Alltweets)
         }
      }

})

export const {setCurrentUser , setAllTweets} = userSlice.actions
export default userSlice.reducer