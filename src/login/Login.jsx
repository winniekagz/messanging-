import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [inputs,setInputs]=useState([])
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data )=> {
      setInputs(data)
      console.log("popped input",inputs)
      axios.post('http://localhost:4001/api/user/login', data)
      .then((response)=>{
        console.log("respponde",response)
      }).catch((err)=>{
        console.log("err",err)
      })
    };
    return (
        <div>
            <section class="vh-100" style={{backgroundColor: "#eee"}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRFadius: "25px"}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4"  onSubmit={handleSubmit(onSubmit)}>


                  <div class="d-flex flex-row align-items-center mb-2">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                    <label class="form-label" for="form3Example3c">Your Email:</label>
                      <input type="email" 
                      name="email" 
                     
                      {...register("email", { required: true })}
                      />

                   {errors.exampleRequired && <span>This field is required</span>}         
                      
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-2">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                    <label class="form-label" for="form3Example4c">Password:</label>
                      <input type="password" 
                      name="password"
                      
                      {...register("password", { required: true })}
                      />

                    {errors.exampleRequired && <span>This field is required</span>}       
                      
                    </div>
                  </div>

                


                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onClick={()=>onSubmit()} class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    );
}

export default Login;
