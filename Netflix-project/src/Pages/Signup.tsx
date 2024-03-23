import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import  {userAuth}  from "../context/AuthContext";
import {User,UserCredential} from 'firebase/auth'

type AuthContextType = {
  user: User | null;
  signUp:  (email: string, password: string) => Promise<UserCredential>
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const Signup = () => {

  const auth  = userAuth();
  if(!auth){
    throw new Error("Authentication failed");
    
  }

  const {signUp} :AuthContextType =auth
  const navigate=useNavigate();
  const [remberLogin,setremberLogin]=useState<boolean>(true)
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
try {
  await signUp(email,password);
  navigate('/')
} catch (error) {
  console.log(error);
  
}
    
    
  }
  return (
    <>
      <div className="w-full h-screen">
        <img
          hidden
          className="hidden sm:block absolute w-full h-full object-cover object-top"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-full"></div>

        <div className=" fixed w-full px-4 py-24  ">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className=" text-3xl font-Nsans-Bold">Sign Up</h1>

              <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-700 rounded-md "
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                ></input>
                <input
                  className="p-3 my-2 bg-gray-700 rounded-md"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                ></input>
                <button className="bg-red-600 py-3 my-2 rounded-sm font-Nsans-Bold">
                  Sign Up
                </button>
              </form>

              <div className="flex justify-between items-center">
                <div className="flex">
                  <input type="checkbox" checked={remberLogin} onChange={(e)=>setremberLogin(!remberLogin)} className="mr-2" />
                  <p className="text-gray-600">Rember Me</p>
                </div>
                <p className="text-gray-600">Need Help</p>
              </div>
             <div>
              <p className="py-4"><span className="text-gray-600" >Already subscribed to Netflix? </span><Link to='/login'>Sign In</Link></p>
             </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
