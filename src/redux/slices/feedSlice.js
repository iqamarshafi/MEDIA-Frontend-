import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlike } from "./postsSlice";



export const getFeedData = createAsyncThunk('user/getFeedData',async (body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('user/getFeedData');
        console.log('getFeed Data  :  ', response.data.result);
        return response.data.result;
    } catch (err) {
        return Promise.reject(err);
    }finally{
        thunkAPI.dispatch(setLoading(false));
    } 
})

export const followOrUnfollow = createAsyncThunk('user/followOrUnfollow', async(body,thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('user/follow',body);
        console.log('follow data   :  ', response.data.result);
        return response.data.result.user;                                   
    } catch (err) {
        return Promise.reject(err);
    }finally{
        thunkAPI.dispatch(setLoading(false));
    } 
})

const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        feedData: {}
    },

   
    extraReducers:
        (builder) =>{
            builder.addCase(getFeedData.fulfilled,(state,action)=>{
                state.feedData = action.payload;
            })
            .addCase(likeAndUnlike.fulfilled,(state,action)=>{
                const post = action.payload;
                const index = state?.feedData?.posts?.findIndex(item => item._id == post._id );
                console.log('feed like ; ', index, post)
                if( index!=undefined && index != -1){
                    state.feedData.posts[index] = post;
                }
            }).addCase(followOrUnfollow.fulfilled,(state,action)=>{
               const user = action.payload;
               const index  = state?.feedData?.followings?.findIndex(item => item._id === user._id);
               if(index!=-1){
                state.feedData.followings.splice(index,1);
               }else{
                state?.feedData.followings.push(user)
               }
              
            })
             
        }
    
})

export default feedSlice.reducer;
