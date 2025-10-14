import React, {  useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import {axiosClient} from '../../utils/axiosClient';
import { getItem, KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleSubmit (e){
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login',{
      email,
      password
    });
    
      setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken);
    console.log('accessToken',response.data.result.accessToken);
    console.log('response: ' ,response);
    navigate('/')
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div className="Login">
    <div className='login-box'>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input placeholder='guest@gmail.com' type="email" name="email" id="email" onChange={(e)=> setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input placeholder="Password" type="password" name="password" id="password" onChange={(e)=> setPassword(e.target.value)}/>

        <input type="submit" className='submit' onSubmit={handleSubmit}/>
      </form>
      <p className='sub-heading'>Do you have an account? <Link to="/signup">Signup</Link></p>
    </div>
    </div>
  )
}

export default Login