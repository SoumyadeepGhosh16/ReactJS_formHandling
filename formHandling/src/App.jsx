import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useForm } from "react-hook-form"

function App() {
 
  
    const {
      register,
      handleSubmit,
      watch,
      setError,
      formState: { errors ,isSubmitting},
    } = useForm();


    const delay=(d)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          resolve()
        }, d*1000);
      })
    }

    const onSubmit = async(data) => {
      await delay(2)   //simulating network delay

      let r=await fetch("https://localpost:3000/",{method:'POST',
      body: JSON.stringify(data)
      })
      let res=await r.text()

      console.log(data, res)
      if(data.username!=="Soumya"){
        setError("myForm",{message:"Invalid credentials"})
      }
       
      if(data.username === "rohan"){
        setError("blocked",{message:"User blocked"})
      }
    }

  return (
    <>
    {isSubmitting && <div>loading...</div>}
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='username' 
          {...register("username", { required: {value :true,message:"this field is required"} ,minLength: {value :5,message:"Min length is 5"}, maxLength: {value: 8 ,message:"Max length is 8"}})}type="text"/> 
          {errors.username && 
          <div className="red">{errors.username.message}</div>}
          <input placeholder='password' {...register("password",
          {minLength: {value: 5 ,message:"Min length is 8"}} ,
          {maxLength: {value: 8 ,message:"Max length is 8"}})} type="password" />
          {errors.password && 
          <div className="red">{errors.password.message}</div>}
          <input disabled={isSubmitting} type="submit" value="submit" id="" />
          
          {errors.myForm && 
          <div className="red">{errors.myForm.message}</div>}

          {errors.blocked && 
          <div className="red">{errors.blocked.message}</div>}
        </form>
      </div>
    </>
  )
}

export default App
