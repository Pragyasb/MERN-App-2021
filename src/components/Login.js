import {useForm} from "react-hook-form"
import {useHistory} from "react-router-dom"
import axios from 'axios'

function Login(props){

            let {register ,handleSubmit,formState:{errors}}= useForm();
            const history=useHistory();

            const onFormsubmit = (credentials)=> {
                
                axios.post(`/${credentials.type}/login`,credentials)
                .then(res=>{
                    let resObj=res.data;
                    if(resObj.message==='login-success'){
                        //save token in local storage
                        localStorage.setItem("token",resObj.token)
                        localStorage.setItem("user",JSON.stringify(resObj.userObj))
                        //update user login status
                        props.setUserLoginStatus(true)

                        if(credentials.type==="user")
                        {
                        history.push(`/userpro/${resObj.username}`)
                        }
                        if(credentials.type==="admin")
                        {
                        history.push(`/adminprofile/${resObj.username}`)
                        }
                        

                        
                    }
                    else{
                        alert(resObj.message)
                    }
                })
                .catch(err=>{
                    console.log(err)
                    alert("something went wrong")
                    
                })
                console.log(credentials)
             }






            return(
                        <form className="w-50 mx-auto bg-light " onSubmit={handleSubmit(onFormsubmit)}>
      <div className="form-check">
                <input type="radio" id="ad" className="form-check-input" {...register('type')} value="admin">
                </input>
                <label htmlFor="ad" className="form-check-label">Admin</label>
            </div>
            <div className="form-check">
                <input type="radio" id="us" className="form-check-input" {...register('type')} value="user">
                </input>
                <label htmlFor="us" className="form-check-label">User</label>
            </div>



         <label htmlFor="un" className="form-label">username </label>
         <input type="text" 
         id="un" 
         placeholder="username"
         {...register("username")} 
         className="form-control mb-3">

         </input>

         
         

         <label htmlFor="pw" className="form-label">password </label>
         <input type="password" 
         id="pw" 
         placeholder="password"
         {...register("password")} 
         className="form-control mb-3">

         </input>

         
         


         <button type="submit"  className="btn btn-primary mt-3  me-2">Login</button>





                     </form>
            )
}

export default Login;