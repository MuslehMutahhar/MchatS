import React,{ useState,useRef,useEffect,  Component, useContext } from "react";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import "./style.scss";
import { BrowserRouter, Route, Switch,Routes, Router, Navigate } from 'react-router-dom';
import { AuthContext , children } from "./context/AuthContext";



function App() {

  const {currentUser} =useContext(AuthContext)
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return<Navigate to="/login"/>
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route 
            index 
              element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;











// function App() {
//     return (
      // <Router>
      //   <Routes>
      //     <Route exact path="/">
      //       <Home />
      //     </Route>
      //     <Route path="/login">
      //       <Login />
      //     </Route>
      //     <Route path="/register">
      //       <Register />
      //     </Route>
      //   </Routes>
      // </Router>
      


    // <BrowserRouter>{
    //   <Routes>
    //     <Route path="/">
    //     <Route index element={<Home />} />
    //     <Route path="login" element={<Login/>}/>
    //     <Route path="register" element={<Register/>}/>
    //     </Route>
    //   </Routes>


    // }
      
    // </BrowserRouter>
    // );


  // const router = createBrowserRouter([
  //       {
  //           path: "/",
  //           element: <Home />
  //       },
  //       {
  //           path: "/login",
  //           element: <Login />
  //       },
  //       {
  //           path: "/register",
  //           element: <Register />
  //       }
  //   ]);

  //   return (
  //       <RouterProvider router={router} />
  //   );
  
    // const router = createBrowserRouter([
    //   {
    //     path:"/",
    //     element:<Home/>
    //   },
    //   {
    //     path:"/login",
    //     element:<Login/>
    //   },
    //   {
    //     path:"/register",
    //     element:<Register/>
    //   }
    // ])
    // return (
    //   <RouterProvider router={router} />
    
  //   <HashRouter>
  //   <Routes>
  //     <Route path="/">
  //       <Route index element={<Home />} />
  //       <Route path="login" element={<Login />} />
  //       <Route path="register" element={<Register />} />
  //     </Route>
  //   </Routes>
  // </HashRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/">
    //       <Route index element={<Home />} />
    //       <Route path="login" element={<Login/>}/>
    //       <Route path="register" element={<Register/>}/>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  // );
// }

// export default App;
