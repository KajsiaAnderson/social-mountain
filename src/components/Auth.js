import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {
    const authCtx = useContext(AuthContext)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
 
   const submitHandler = e => {
       e.preventDefault()

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
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth