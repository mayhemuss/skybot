import {Spinner} from "./Pages/Spinner/Spinner";
import {Route, Routes,} from "react-router-dom";
import {Suspense} from 'react';
import {GameLazy} from "./Pages/Game/GameLazy";

function App() {


  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path={"/"} element={<Spinner/>}/>
        <Route path={"/game"} element={<GameLazy/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
