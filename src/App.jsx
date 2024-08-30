import {Spinner} from "./Pages/Spinner/Spinner";
import {Route, Routes,} from "react-router-dom";
import {Suspense} from 'react';
import {FifaLazy} from "./Pages/Fifa/FifaLazy";
import Fifa from "./Pages/Fifa/Fifa";
import Iphone from "./Pages/Iphone/Iphone";

function App() {


  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path={"/"} element={<Fifa/>}/>
        <Route path={"/iphone"} element={<Iphone/>}/>
      </Routes>
    </Suspense>
  )
    ;
}

export default App;
