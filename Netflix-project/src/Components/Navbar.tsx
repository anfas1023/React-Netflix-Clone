import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

const Navbar = () => {

  const auth = userAuth()
  if(!auth){
    throw new Error("UserAuth is null");
    
  }
  const {user,logOut}=auth

  const navigate=useNavigate();

 const handleLogout =async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  navigate('/');
  try{
  await logOut();

  }catch (err){
    console.log(err);
    
  }



 }
  return (
    <div className='absolute w-full p-4 flex items-center justify-between z-50'>
     <Link to='/'>
        <h1 className='uppercase text-red-600 font-bold cursor-pointer text-5xl tracking-tighter'>
            netflix
        </h1>
     </Link>
   {user?.email ? (
         <div>
         <Link to='/profile'>
        <button className='text-transform: capitalize pr-4'>Profile</button>
         </Link>
 

        <button onClick={handleLogout} className='text-transform: capitalize bg-red-600 px-6 py-2 rounded '>Logout</button>
        
      </div>
   ) :(
<div>
    <Link to='/login'>
   <button className='text-transform: capitalize pr-4'>Login</button>
    </Link>

    <Link to='/signup'>
   <button className='text-transform: capitalize bg-red-600 px-6 py-2 rounded '>Sign up</button>
    </Link>
 </div>
   )}
 
    </div>
  )
}

export default Navbar
