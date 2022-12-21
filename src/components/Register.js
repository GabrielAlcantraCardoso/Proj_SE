import { TextField, Typography } from '@mui/material'
import { Box, Button } from '@mui/material'
import React from 'react'
//import { Button } from './Button'
import './Register.css'
import axios, {isCancel, AxiosError} from 'axios';
import { TimesOneMobiledataRounded } from '@mui/icons-material';


function handleSubmit() {
  axios.post("http://127.0.0.1:5000/Register", {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value, 
    password: document.getElementById("password").value
  }).then((response) => {setTimeout(redirect(response.data.msg), 1000)})
    .catch((error) => console.error('[FAIL] :: ' + error))
}

//amazing
function redirect(error)
{
	console.log(error)
	if(error=='register successful')
	{
		window.location.href = "/Login"
	}
	else
	{
		window.alert("something wong")
	}
}

function Register() {
  return (
    <div>
        <form method="POST">
            <Box className='sign-up-form'>
                <Typography className='typography' variant='h2'>Sign-up</Typography>
                <TextField margin='normal' id="email" name='email' type={'email'} variant='outlined' placeholder='Email'/>
                <TextField margin='normal' id="username" name='username' type={'text'} variant='outlined' placeholder='Username'/>
                <TextField margin='normal' id="password" name='password' type={'password'} variant='outlined'placeholder='Password'/>
                <Button onClick={handleSubmit} variant='contained' color='warning' style={{
								  backgroundColor: "#e64381",
							  }}>Register</Button>
            </Box>
        </form>
    </div>
  )
}

export default Register