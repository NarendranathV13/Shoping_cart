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
      {/* <Demo2 /> */}
    </div>
  );
}

export default App;
