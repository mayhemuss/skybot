import {Spinner} from "./Pages/Spinner/Spinner";
import {Route, Routes,} from "react-router-dom";
import {Suspense} from 'react';
import {FifaLazy} from "./Pages/Fifa/FifaLazy";
import Fifa from "./Pages/Fifa/Fifa";

function App() {


  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path={"/games"} element={<Fifa/>}/>
      </Routes>
    </Suspense>
  )
    ;
}

export default App;
