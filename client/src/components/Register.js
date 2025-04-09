import React, {useState} from 'react'
import { NavLink }  from 'react-router-dom'
import "./mix.css"
const Register = () => {


      const [passShow,setPassShow] = useState(false);
      const [cpassShow,setCPassShow] = useState(false);


        const [inpval,setInpval] = useState({
            fname:"",
            email:"",
            password:"",
            cpassword:""
        });

        // console.log(inpval);

        const setVal = (e) => {
            // console.log(e.target.value);
            const {name, value} = e.target;
            setInpval(() =>{
                return{
                    ...inpval,
                    [name]:value
                }
            })
        };


        const addUserdata = async(e) =>{
            e.preventDefault();

            const {fname,email,password,cpassword} = inpval;

            if(fname === ""){
                alert("please enter Your name");
            }else if (email === ""){
                alert("please enter Your email");
            }else if (!email.includes("@")){
                alert("enter valid email");
            }else if (password === ""){
                alert("enter your password");
            }else if(password.length < 6){
                alert("password must be 6 char");
            }else if (cpassword === ""){
                alert("enter your confirm password");
            }
            else if(password.length < 6){
                alert(" confirm password must be 6 char");
            }
            else if(password !==cpassword){
                alert("password and confirm password not match");
            }else{
                
                // console.log("user registration succesfully done");

                const data = await fetch("/register",{
                    method:"POST", 
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        fname,email,password,cpassword
                    })
                });

                const res = await data.json();
                    console.log(res.status);

                if(res.status === 201){
                    alert(" ✅ user registration done");
                    setInpval({...inpval,fname:"",email:"",password:"",cpassword:""})
            }
            
        }

    }

  return (
      <>
        <section> 
                <div className="form_data">

                              {/* sign-up */}
                        <div className='form_heading'> 
                                <h1> Sign Up</h1>
                                <p> 
                                    We are you glad that you will be using project to manage
                                    your tasks ! we hope that you will get like it.
                                </p>
                        </div>
                                  {/* end sign-up */}
                        <form>

                              {/* name */}
                            <div className='form_input'>
                                <label htmlFor='fname'> Name</label>
                                <input type='text' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter your Name' />

                            </div>

                                {/* end name*/}


                                {/* email */}
                            <div className='form_input'>
                                <label htmlFor='fname'> Email</label>
                                <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter your Email Address' />

                            </div>

                                {/* end email */}

                                {/* password */}
                            <div className='form_input'>
                                <label htmlFor='Password'> Password</label>
                                <div className='two'>


                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password}  name='password' id='password' placeholder='Enter your Password' />
                                    <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                        {!passShow ? "Show" : "Hide"}

                                    </div>
                                </div>

                            </div>
                                    
                                    {/* end password */}


                                    {/* confirm password */}
                            <div className='form_input'>
                                <label htmlFor=' CPassword'> Confirm Password</label>
                                <div className='two'>


                                <input type={!cpassShow ? "Password" : "text"} value={inpval.cpassword} onChange={setVal} name='cpassword' id='cpassword' placeholder='Confirm  Password' />
                                    <div className='showpass' onClick={() => setCPassShow(!cpassShow)}>
                                        {!cpassShow ? "Show" : "Hide"}

                                    </div>
                                </div>

                            </div>
                                      
                                      {/* end confirm password */}



                                <button className='btn' onClick={addUserdata}> Sign Up</button>
                                <p> Already have an account? <NavLink to= "/"> Log In</NavLink></p>
                        </form>


                </div>

         </section>
      </>
  )
}

export default Register;
