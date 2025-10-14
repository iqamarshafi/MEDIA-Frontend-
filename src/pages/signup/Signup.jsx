import React, { useState } from 'react'
import './signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';

function Signup() {
  const [name, setName]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  async function handleSubmit (e){
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/signup',{
      name,
      email,
      password
    });
    
      setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken);
    // console.log('accessToken',response.data.result.accessToken);
    console.log('response: ' ,response);
  
    } catch (error) {
      console.log(error)
    }
     navigate('/')
  }

  return (
    <div className="Signup">
    <div className='signup-box'>
      <h2 className='heading'>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>

        <input type="submit" className='submit' onSubmit={handleSubmit}/>
      </form>
      <p className='sub-heading'>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
    </div>
  )
}

export default Signup