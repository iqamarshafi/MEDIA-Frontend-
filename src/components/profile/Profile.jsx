import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import './profile.scss'
import userImg from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { followOrUnfollow } from '../../redux/slices/feedSlice'



function Profile() {

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.postsSliceReducer.userProfile);
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);
  const feedData = useSelector(state =>state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState(false);
  console.log('user profile: ', userProfile);

  const [isMyProfile, setIsMyProfie] = useState(false)

  useEffect(()=>{
    dispatch(getUserProfile({
      userId: params.userId

    }));
    
    setIsMyProfie(myProfile._id === params.userId)
    setIsFollowing(feedData?.followings?.find(item=> item._id ===params.userId));
  },[myProfile,params.userId,feedData]);

  function handleUserFollow(){
    dispatch(followOrUnfollow({
          userIdToFollow: params.userId
        }))
  }
  return (
    <div className='profile'>
      <div className="container">
        <div className="left-part">
        {isMyProfile && <CreatePost/>}
        {userProfile?.posts?.map(post => <Post key={post._id} post={post}/>)}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className='user-img' src={userProfile?.avatar?.url || userImg} alt="" />
            <h3 className='user-name'>{userProfile?.name}</h3>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`} </h4>
              <h4>{`${userProfile?.followings?.length} Followings`}</h4>
            </div>
            {(!isMyProfile) && (<h5 onClick={handleUserFollow} className={isFollowing? 'hover-link follow-link' : 'btn-primary'}>{isFollowing? 'unfollow' : 'follow'}</h5>)}
            {isMyProfile && <button className='update-profile btn-secondary' onClick={()=>navigate('/updateProfile')}>Update profile</button>
}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile                                          