import axios from 'axios'
function Test(){



     let token= localStorage.getItem("token")

     //create an axios req obj

     let apiURL= "http://localhost:8080";

     let axiosReq= axios.create({

        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
     })



  const makeReqToProtectdRoute=()=>{
      axiosReq.get("/user/testing")
      .then(res=>{
          alert(res.data.message)
      })
  }





    return(
        <div>
        <h1>Text</h1>

        <button onClick={makeReqToProtectdRoute}>Make Req</button>
</div>
    )
}
export default Test;