import React from 'react'
import './avatar.scss'
import userImg from '../../assets/user.png'

function Avatar({src}) {
  return (
    <div className='avatar'>
        <img src={src ? src : userImg} alt="user_avatar" />
    </div>
  )
}

export default Avatar