import {useParams ,useHistory} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'


function ViewProducts(props){
    let paramsObj=useParams();
    let [product,setProduct]=useState([])
    let type=localStorage.getItem("type")
    let[typeStatus,setTypeStatus]=useState("")
   
    
    
    
    let history=useHistory()

   useEffect(()=> {
        axios.get("/product/getproducts")
        .then(res=>{
            let productObj=res.data.message;
           // console.log("product obj is",productObj)
            setProduct([...productObj])
             if(type==="user")
             {
             setTypeStatus(true)
             }
             if(type==="admin")
             {
                 setTypeStatus(false)
             }
           
            
        })
        .catch(err=>{
            console.log(err)
            alert("something went wrong")
        })
        //get data from local storage
        //let productObj=JSON.parse(localStorage.getItem("user"))
    
    },[product.productname])
    
    


    return(
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 bg-light ">
            {
              product &&  product.map((element,ind)=>{
                    return(
                        <div className="col " key={ind}> 
                            <div className="card shadow">
                            <img src={element.profileImage} className="card-img-top h-75"  alt="" />
                                <div className="card-body">
                                <h5 className="card-title">Product Name: {element.productname}</h5>
                                    <h6>Model No: {element.model}</h6>
                                    <h6>Price: {element.price}</h6>
                                    <h6>DateofManf: {element.dateofman}</h6>
                         
                                        { typeStatus?
                                      
                                      <button className="btn btn-primary float-end " onClick={()=>props.addProductToCart(element)}>Add to cart</button>
                                      :
                                      <div>
                                      <button className="btn btn-danger float-start">Delete</button>
                                      <button className="btn btn-success float-end">Edit</button>
                                      </div>
                                }
                               
                                
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