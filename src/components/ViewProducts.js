import {useParams ,useHistory} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'


function ViewProducts(){
    let paramsObj=useParams();
    let [product,setProduct]=useState([])
    console.log("product is", product);
    
    
    
    let history=useHistory()

   useEffect(()=> {
        axios.get("/product/getproducts")
        .then(res=>{
            let productObj=res.data.message;
            console.log("product obj is",productObj)
            setProduct([...productObj])
           
           
            
        })
        .catch(err=>{
            console.log(err)
            alert("something went wrong")
        })
        //get data from local storage
        //let productObj=JSON.parse(localStorage.getItem("user"))
    
    },[product.productname])

  
    


    return(
        <div className="row row-col-sm-3 mt-3 ">
            {
                product.map((element)=>{
                    return(
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                <h5 className="card-title bg-dark text-white">Product Name: {element.productname}</h5>
                                <img src={element.profileImage} width="120px" alt="" />
                                  
                                    <h6>Model No: {element.model}</h6>
                                    <h6>Price: {element.price}</h6>
                                    <h6>DateofManf: {element.dateofman}</h6>

                                </div>

                            </div>
                            </div>
                        

                        )
                    })
                
               }     
           
            </div>
            
        )
    
    }
    export default ViewProducts;