import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import './createPost.scss'
import backgroungDummy from '../../assets/background.jpg'
import { BiImageAdd } from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux'
import { setLoading } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { getUserProfile } from '../../redux/slices/postsSlice';

function CreatePost() {
    const [postImg, setPostImg] =useState('');
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    function handleImgChange(e){
        
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ()=>{
            if(fileReader.readyState === fileReader.DONE){
            setPostImg(fileReader.result);
            }
        }
    }
    const handlePostSubmit = async ()=>{
        try {
            dispatch(setLoading(true));
            const result = await axiosClient.post('/posts',{
                caption,
                postImg 
            })
            console.log('post done: ', result);
            dispatch(getUserProfile({
                userId: myProfile._id
            }));
        } catch (err) {
            console.log('is there any err:  ', err)
        }finally{
            dispatch(setLoading(false));
            setCaption('');
            setPostImg('');
        }
    }

    
  return (
        <div className="create-post">
        <div className="container_post">
            <div className="left-part">
                <Avatar/>
            </div>
            <div className="right-part">
                <input  value={caption} type="text" name="" id="" className='caption' placeholder='whats on your mind?' onChange={(e)=>setCaption(e.target.value)}/>
                {postImg && <div className="img-container">
                    <img className='post-img' src={postImg} alt="postImg" />
            </div>}
            <div className="bottom-part">
                <div className="input-post-img">
                    <label htmlFor="postImg" className='label-img'> 
                      <BiImageAdd/>
                    </label>
                    <input type="file" accept='image/*'  id='postImg' onChange={handleImgChange} />
                </div>
                <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default CreatePost