import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Register from "./components/Registration";
import Login from "./components/Login";
import Test from './components/Test'
import Userprofile from "./components/Userprofile"
import Products from './components/Products'
import AdminProfile from './components/Adminprofile'
import {useState} from 'react'
 

function App() {
    let [userLoginStatus,setUserLoginStatus]=useState('')

  
    const logoutUser=()=>{
        localStorage.clear();
        setUserLoginStatus(false)

    }


  return (
    <div className="App">
<BrowserRouter>
<ul className="nav justify-content-end bg-dark p-2">
            <li className="nav-item text-light ">
            <Link to ="/home" className="nav-link">Home</Link>
            </li>


            <li className="nav-item text-light">
            <Link to ="/register" className="nav-link">Register</Link>
            </li>

            <li className="nav-item text-light">
            <Link to ="/test" className="nav-link">Test</Link>
            </li>

{          !userLoginStatus?
            <li className="nav-item text-light">
            <Link to ="/login" className="nav-link">Login</Link>
            </li>:

            <li className="nav-item text-light">
            <Link to ="/login" className="nav-link" onClick={()=>logoutUser()}>Logout</Link>
            </li>
}          

          <li className="nav-item text-light">
            <Link to ="/product" className="nav-link">Products</Link>
            </li>
        </ul>

<Switch>
            <Route path="/home">
                <Home />

            </Route>


            <Route path="/register">
                <Register />

            </Route>

            <Route path="/test">
                <Test />

            </Route>

            <Route path="/login">
                <Login setUserLoginStatus={setUserLoginStatus} />

            </Route>

            <Route path="/userpro/:username">
                <Userprofile />

            </Route>


            <Route path="/product">
                <Products />

            </Route>
            <Route path="/adminprofile">
                <AdminProfile />

            </Route>

        </Switch>


        </BrowserRouter>

    </div>
  );
}

export default App;