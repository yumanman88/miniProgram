import React from 'react';
import {
  imgUrl
} from '../imgUrl.js';
import {
  url
} from '../url.js';
const Login = (props) => (<img style={{width:'100vw'}} src={`${imgUrl}login.png`} onClick={()=>{location.href=`${url}home`}}/>);
export default Login;