import React, { useRef, useState } from 'react'
import './navbar.scss'
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
 import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const [isOpen, setIsOpen] = useState(false);

    async function handleLogoutClick(){
       try {
        dispatch(setLoading(true));
        await axiosClient.post('/auth/logout');
        removeItem(KEY_ACCESS_TOKEN);
        navigate('/login');
        dispatch(setLoading(false));
       } catch (err) {
        
       } 
    }

  return (
    <div className="Navbar">
        
        <div className="container">
            <h2 className="banner hover-link" onClick={()=>navigate('/')}>Media</h2>
            <div className="right-side">
                <div className="profile hover-link" onClick={()=>navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                <div className="log-out hover-link" onClick={handleLogoutClick}>
                    <AiOutlineLogout className='icon'/>
                </div>
            </div>
            
            <div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
                 <GiHamburgerMenu className='menu'/>
               
            </div>
    
            
            <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
                 <div className="profile hover-link" onClick={()=>navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                <div className="log-out hover-link" onClick={handleLogoutClick}>
                    <AiOutlineLogout className='icon'/>
                </div>
            </div>

            
        </div>                                                                  
    </div>
  );
}

export default Navbar