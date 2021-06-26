import {useForm} from "react-hook-form"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useState } from "react";

function Registration(){

            let {register ,handleSubmit,formState:{errors}}= useForm();
            let [file,setFile]=useState(null)
            const history=useHistory();

            const onFormsubmit = (userObj)=> {

                    //creatr FormData obj
                    let formData=new FormData();

                    //add file to formData
                    formData.append("photo",file,file.name)

                    //add userObj to formData
                    formData.append("userObj",JSON.stringify(userObj))
                  
                       
                        axios.post("/user/createusers",formData)
                        .then(res=>{
                            let resObj=res.data
                            alert(resObj.message)
                            history.push('/login')
                        })
                        .catch(err=>{
                            console.log(err);
                            alert("something went wrong")
                        })
                  
        
                }
                const onFileSelect=(e)=>{
                    setFile(e.target.files[0])
                }


            return(
                  
                <div className="m-5 bg-light shadow ">
                <form className="mx-auto w-50 m-3 p-3 " onSubmit={handleSubmit(onFormsubmit)}>

                <label htmlFor="un" className="form-label">Username</label>
                <input type="text" id="un" className="form-control mb-3" {...register('username')}></input>
     
                <label htmlFor="pw" className="form-label">Password</label>
                <input type="password" id="pw" className="form-control mb-3"{...register('password')}></input>
     
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-control mb-3" {...register('email')}></input>
     
                <label htmlFor="dob" className="form-label">Date of birth</label>
                <input type="date" id="dob" className="form-control mb-3" {...register('dateofbirth')}></input>

                <input type="file" name="photo" className="form-control mb-3" onChange={(e)=>{onFileSelect(e)}}></input>
     
     
                 <button type="submit" className="btn btn-info mt-3 p-2">Register</button>
     
     
            </form>
          

               </div>         




                                  
            )
}

export default Registration;