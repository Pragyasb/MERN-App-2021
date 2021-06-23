import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import AddProducts from './AddProducts'
import ViewProducts from './ViewProducts'
function Adminprofile(){
    return(
        <BrowserRouter>

        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
            <Link to ="/addproducts" className=" nav-link text-white bg-primary border p-2 m-2">Add Products</Link>
            </li>
            <li className="col-6">
            <Link to ="/viewproducts" className="nav-link bg-success text-white border p-2 m-2 " >View Products</Link>
            </li>

        </ul> 

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
export default Adminprofile;
