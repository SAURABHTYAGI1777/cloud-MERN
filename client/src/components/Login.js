
import React, { useState } from 'react'
import { NavLink }  from 'react-router-dom'
import "./mix.css"
const Login = () => {

    const [passShow,setPassShow] = useState(false);

    const [inpval,setInpval] = useState({
                email:"",
                password:"",
            });

            // console.log(inpval);
    
            const setVal = (e) => {
                console.log(e.target.value);
                const {name, value} = e.target;
                setInpval(() =>{
                    return{
                        ...inpval,
                        [name]:value
                    }
                })
            };


            const loginuser = async(e) =>{
                e.preventDefault();

                const {email,password} = inpval;
                 if (email === ""){
                    alert("please enter Your email");
                }else if (!email.includes("@")){
                    alert("enter valid email");
                }else if (password === ""){
                    alert("enter your password");
                }else if(password.length < 6){
                    alert("password must be 6 characters");
                }else{
                   
                    console.log("user login succesfully done");

                    const data = await fetch("/login",{
                        method:"POST", 
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,password
                        })
                    });
    
                    const res = await data.json();
                        console.log(res);
    
                    if(res.status === 201){
                        alert(" ✅ user registration done");
                        setInpval({...inpval,email:"",password:""})
                    }
                }
            }

            

  return (
    <div>
         <section> 
                <div className="form_data">
                        <div className='form_heading'> 
                                <h1> Welcome Back, Log In</h1>
                                <p>
                                    Hi, We are you glad you are back, please login.
                                </p>
                        </div>

                        <form>
                            <div className='form_input'>
                                <label htmlFor='email'> Email</label>
                                <input type='email' value={inpval.email} onChange={setVal} name='email' id='email' placeholder='Enter your Email Address' />

                            </div>

                            <div className='form_input'>
                                <label htmlFor='Password'> Password</label>
                                <div className='two'>


                                <input type={!passShow ? "Password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter your Password' />
                                    <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                        {!passShow ? "Show" : "Hide"}

                                    </div>
                                </div>

                            </div>

                                <button className='btn' onClick={loginuser}> Login</button>
                                <p> Dont't have an Account? <NavLink to= "/register">Sign Up</NavLink></p>
                        </form>


                </div>

         </section>
    </div>
  )
}

export default Login;


