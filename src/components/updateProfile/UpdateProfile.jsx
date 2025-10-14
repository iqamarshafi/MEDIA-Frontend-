import React, { useEffect, useRef, useState } from 'react'
import userImg from '../../assets/user.png'
import './updateProfile.scss'
import {useDispatch, useSelector} from 'react-redux'
import { setLoading, showToast, updateMyProfile } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { TOAST_SUCCESS } from '../../App';

function UpdateProfile() {
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);
  const [name,setName] = useState('');
  const [bio,setBio] = useState('');
  const [img, setImg] = useState('');
  const update_picture = useRef(null);
  const dispatch = useDispatch();


  useEffect(()=>{
    setName(myProfile?.name || '');
    setBio(myProfile?.bio || '');
    setImg(myProfile?.avatar?.url || '');
  },[myProfile])


  function handleImgChange(e){
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
      if(fileReader.readyState === fileReader.DONE){
        setImg(fileReader.result);
      }
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateMyProfile({
      name, 
      bio, 
      img
    }))
  }

  async function handleDelete(){
    console.log('inside delete')
     await axiosClient.delete('user/deleteAccount');
     dispatch(showToast({
                 type: TOAST_SUCCESS,
                 message: 'Account Deleted Successfully'
             }))
  }
  

  return (
    <div className='updateProfile'>
      <div className="container">
        
        <div className="left-part">
          
          <div className="input-user">
            <label htmlFor="userImg" className='label-img'> <img src={img || userImg} alt="profie_photo" /></label>
            <input type="file" accept='image/*'  ref={update_picture} onChange={handleImgChange} />
          </div>
          
          <button className="btn-primary" onClick={()=> update_picture.current.click()}>update picture</button>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input value={name} type="text" placeholder='your name' onChange={(e)=> setName(e.target.value)} />
            <input value={bio} type="text" placeholder='your bio' onChange={(e)=> setBio(e.target.value)} />
            <button type="submit" className="btn-primary save-btn" onClick={handleSubmit}>Save</button>

          </form>
          <button className='delete-account btn-primary' onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile