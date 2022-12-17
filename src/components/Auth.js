import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {
    const authCtx = useContext(AuthContext)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const [message, setMessage] = useState('')
   const [display, setDisplay] = useState('none')
 
   const submitHandler = e => {
       e.preventDefault()
       setDisplay('none')

       const body = {
        username,
        password
       }

       const url = 'http://localhost:3000'
    // const url = 'https://socialmtn.devmountain.com'
 
       axios.post(register ? `${url}/register` : `${url}/login`, body)
       .then((res) => {
        console.log('data', res.data)
        authCtx.login(res.data.token, res.data.exp, res.data.userId)
       })
       .catch(err => {
        console.log('error', err)
        setMessage(err.response.data)
        setDisplay('block')
        setUsername('')
        setPassword('')
       })

   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='text'
                   placeholder='username'
                   onChange={e => setUsername(e.target.value)}
                   value={username}
                   />
               <input
                   className='form-input'
                   type='password'
                   placeholder='password'
                   onChange={e => setPassword(e.target.value)}
                   value={password}
                   />
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <p style={{display: display}} className='auth-msg'>{message}</p>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth