import {useForm} from "react-hook-form"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useState } from "react";
function AddProducts(){

    let {register,handleSubmit,formState:{errors}}= useForm();
    let [file,setFile]=useState(null)

    const onFormsubmit = (prodObj)=> {
         //creatr FormData obj
         let formData=new FormData();

         //add file to formData
         formData.append("prodphoto",file,file.name)

         //add userObj to formData
         formData.append("prodObj",JSON.stringify(prodObj))
       

           //console.log(prodObj)

           //post req
            axios.post("/product/createproducts",formData)
            .then(res=>{
                let resObj=res.data
                //console.log("resObj",resObj)
                alert(resObj.message)
                //console.log("res is",prodObj)
                localStorage.setItem("product",JSON.stringify(prodObj))
               
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
        <div className="bg-light m-5 shadow " >
        <form className="mx-auto w-50 m-3 p-3" onSubmit={handleSubmit(onFormsubmit)}>

        <label htmlFor="pn" className="form-label">Product Name</label>
        <input type="text" id="pn" className="form-control mb-3" {...register('productname')}></input>

        <label htmlFor="pw" className="form-label">Model No</label>
        <input type="text" id="pw" className="form-control mb-3"{...register('model')}></input>

       
        <label htmlFor="pc" className="form-label">Price</label>
        <input type="number" id="pc" className="form-control mb-3"{...register('price')}></input>

        <label htmlFor="dob" className="form-label">Date of Manufacture</label>
        <input type="date" id="dob" className="form-control mb-3" {...register('dateofman')}></input>

        <input type="file" name="prodphoto" className="form-control mb-3" onChange={(e)=>{onFileSelect(e)}}></input>

    

         <button type="submit" className="btn btn-info mt-3 p-2">Add Product</button>


    </form>
    </div>


    )
}
export default AddProducts;