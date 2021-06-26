import axios from "axios";
import { useEffect, useState } from "react";
import {BrowserRouter, Switch, Link, Route, Redirect, useHistory} from "react-router-dom"

function UserCart(props){
    
     let cartData=props.cartData
    let productStatus=props.productStatus
     let history=useHistory()
    

    return(
        <div className ="bg-light m-5 shadow">
          {  productStatus?

        <table className="table  m-3 ">
            <thead>
                <tr className="bg-info p-2">
                    <th>Product Name</th>
                    <th>Model No</th>
                    <th>Price</th>
                    <th>product Image</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                 cartData && cartData.map((data,ind)=>{
                     return(
                         
                         <tr key={ind} p-2>
                             <td>{data.productname}</td>
                             <td>{data.model}</td>
                             <td>{data.price}</td>
                             <td><img src={data.profileImage} width="120px" /></td>
                             <td><button className="btn btn-danger btn-sm">Delete</button></td>

                         </tr>
                     )
                 })
             }    
            
            </tbody>

        </table>:
            
                <div>
                    <img  src="data:image/png;base64,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" 
                    width="400px"           />
                </div>

       
            }

        </div>
    )
}
export default UserCart;