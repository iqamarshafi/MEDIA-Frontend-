import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './follower.scss'
import { useDispatch, useSelector } from 'react-redux';
import { followOrUnfollow } from '../../redux/slices/feedSlice';
import {useNavigate} from 'react-router'

function Follower({user}) {
  const dispatch = useDispatch();
  const feedData = useSelector(state =>state.feedDataReducer.feedData);
  const navigate = useNavigate()
  const [isFollowing, setIsFollowing] = useState(false);      
  

  useEffect(()=>{
    setIsFollowing(feedData?.followings.find(item=> item._id === user._id));
  },[feedData]);

  function handleUserFollow(){
    dispatch(followOrUnfollow({
      userIdToFollow: user._id
    }))
  }
  return (
    <div className='follower'>
        <div className="user-info" onClick={()=> navigate(`/profile/${user._id}`)}>
            <Avatar src={user?.avatar?.url}/>
            <h4 className='name'>{user?.name}</h4>
        </div>
        <h5 onClick={handleUserFollow} className={isFollowing? 'hover-link follow-link' : 'btn-primary'}>{isFollowing? 'unfollow' : 'follow'}</h5>
    </div>
  )
}

export default Follower