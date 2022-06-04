import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes, Route, Link, useParams} from 'react-router-dom';
import Register from "./login/Register"
import Login from "./login/Login";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
   <div class="app">
     <Router>
       <Routes>
         <Route path="/register" element={<Register/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
       </Routes>
     </Router>
   </div>
  );
}

export default App;
