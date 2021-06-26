import {useParams ,useHistory} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'
import ViewProducts from './ViewProducts';
import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import UserCart from './UserCart';


function Userprofile(){
    let paramsObj=useParams();
    let username=paramsObj.username
    
    let[user,setUser]=useState('')
    let history=useHistory()
   
    let [cartData,setCartData]=useState([])
    let [product,setProduct]=useState(0)
    let [count,setCount]=useState(0)
    let [productStatus,setProductStatus]=useState(false)
    console.log("product status",productStatus)


    const addProductToCart =(prodObj) =>{
        //get username from local storage
        let username=localStorage.getItem("username")
        
        let newObj={username,prodObj}
        console.log("product added is",newObj)
        axios.post("/user/addtocart",newObj)
        .then(res=>{
            let responseObj=res.data;
            setProduct(product+1)
            setProductStatus(true)
            alert(responseObj.message)
       
        })
        .catch(err=>{
            alert("something went wrong")
        })
      
       
    }

    useEffect(()=> {

        axios.get(`/user/getcart/${username}`)
           .then(res=>{
               let cartObj=res.data.message;
              
               let products=cartObj[0].products
            
               setCartData([...products])

             let cartCount=products.length
               setCount(cartCount)
                 
           })
           .catch(err=>{
               console.log(err)
               alert("something went wrong")
           })

         //get the data from local storage
         let userObj=JSON.parse(localStorage.getItem("user"))
         setUser({...userObj})
        console.log(user)

    },[paramsObj.username,product]) 
  



  


    return(
        <div >
        <h1 className="text-end mt-2">welcome,<span className="text-primary mt-3">{paramsObj.username}
        <img src={user.profileImage} width="60px" alt=""  />
        </span></h1>
           
        <BrowserRouter>

          <ul className="nav nav-pills nav-fill">
              { !productStatus?
            <li className="nav-item">
            <Link to ="/viewproducts" className="nav-link bg-dark text-white border p-2 m-2 text-start" ><h5 className="text-info ms-4">View Products</h5></Link>
             </li>:
    
    <li className="nav-item">
            <Link to ="/usercart" className=" nav-link text-white text-start bg-dark border p-2 m-2">
              <h5 className="text-info float-start ms-4"> View Cart Items</h5>
            <button type="button" class="btn btn-info me-4 " style={{marginLeft:"75%"}}>
                  Cart <span class="badge bg-secondary">{count}</span>
            </button>
            
             </Link>
             </li>
}

</ul> 

  <Switch>
    { productStatus?
  <Route path="/usercart">
     <UserCart cartData={cartData} productStatus={productStatus} />
   </Route> :

     <Route path="/viewproducts">
     <ViewProducts  addProductToCart={addProductToCart}/>
     </Route>
}
      </Switch>

</BrowserRouter>
        </div>
    )

}
export default Userprofile