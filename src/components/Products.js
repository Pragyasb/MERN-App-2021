import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import AddProducts from './AddProducts'
import ViewProducts from './ViewProducts'
function Products(){

    return(
        <BrowserRouter>

           <div className="row">
               <div className="col-6">
               <Link to ="/addproducts" className=" text-white bg-primary border p-5 m-3">Add Products</Link>
               </div>
               <div className="col-6">
               <Link to ="/viewproducts" className=" bg-success text-white border p-5 m-3" >View Products</Link>
               </div>

           </div> 

             <Switch>

             <Route path="/addproducts">
                <AddProducts />
               </Route> 

                <Route path="/viewproducts">
                <ViewProducts />
                </Route>

                 </Switch>

        </BrowserRouter>

    )

}
export default Products;