import {Spinner} from "./Pages/Spinner/Spinner";
import {Route, Routes,} from "react-router-dom";
import {Suspense} from 'react';
import {FifaLazy} from "./Pages/Fifa/FifaLazy";
import {DotaLazy} from "./Pages/Dota/DotaLazy";

function App() {


  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path={"/fifa"} element={<FifaLazy/>}/>
        <Route path={"/dota"} element={<DotaLazy/>}/>
      </Routes>
    </Suspense>
  )
    ;
}

export default App;
