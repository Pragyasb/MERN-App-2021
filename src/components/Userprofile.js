import {useParams ,useHistory} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'
import ViewProducts from './ViewProducts';


function Userprofile(){
    let paramsObj=useParams();
    let[user,setUser]=useState('')
    let history=useHistory()

    useEffect(()=> {
        /*
        axios.get(`/user/getuser/${paramsObj.username}`)
        .then(res=>{
            let userObj=res.data.message;
            setUser({...userObj})
        })*/

         //get the data from local storage
         let userObj=JSON.parse(localStorage.getItem("user"))
         setUser({...userObj})
        console.log(user)

    },[paramsObj.username]) 

    /*
    const logout=()=>{
        console.log("logout")
        localStorage.removeItem('token')
        history.push('/login')

    }*/

    


    return(
        <div>
        <h1>welcome,<span className="text-primary mt-3">{paramsObj.username}</span></h1>
         <div className="m-5">  
        <h3 >Your email is : {user.email}</h3>
        <h3>Your date of birth : {user.dateofbirth}</h3>
         </div>  

         <div>
             <ViewProducts />             
         </div>
       
      
       
        </div>
    )

}
export default Userprofile