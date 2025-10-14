import React from 'react'
import Avatar from '../avatar/Avatar'
import './post.scss'
import backgroundImg from '../../assets/background.jpg'
import { BiLike } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { likeAndUnlike } from '../../redux/slices/postsSlice';
import { AiFillLike } from 'react-icons/ai';
import {useNavigate} from 'react-router'
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';

function Post({post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handlePostLike() {
        dispatch(showToast({
            type: TOAST_SUCCESS,
            message: 'like or unlike'
        }))
        dispatch(likeAndUnlike({
            postId: post._id

        }))
    }

  return (
    <div className='Post'>
        <div className="heading" onClick={()=> navigate(`/profile/${post?.owner?._id}`) }>
            <Avatar src={post?.owner?.avatar?.url}/>
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="post_img" />
        </div>
        <div className="footer">
            <div className="like" onClick={handlePostLike}>
              {post.isLiked? <AiFillLike style={{color: 'var(--accent-color)'}}className='icon'/>: <BiLike className='icon'/>}  
                <h4>{`${post?.likesCount} likes`}</h4>
            </div>
            <div className="caption">{post?.caption}</div>
            <h6 className='time-ago'>{post?.timeAgo}</h6>
        </div>
    </div>
  )
}

export default Post