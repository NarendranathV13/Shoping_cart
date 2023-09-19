import './App.css';
// import Demo2 from './Components/demo2';
import { BrowserRouter} from "react-router-dom";
import { useState } from 'react';
import Router from './Router/Router';
function App() {
  const [isauth,setAuth]= useState("false")
  return (
    <div className={isauth == "true" ? "content" :"bg-light "}>
       <BrowserRouter>
        <Router auth={setAuth}/>
      </BrowserRouter>
      {/* <Demo2 />  add this comp and get the token and place in Api header */}
    </div>
  );
}

export default App;
