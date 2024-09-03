import {Spinner} from "./Pages/Spinner/Spinner";
import {Route, Routes,} from "react-router-dom";
import {Suspense} from 'react';
import {GameLazy} from "./Pages/Fifa/GameLazy";
import {IphoneLazy} from "./Pages/Iphone/IphoneLazy";

function App() {


  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path={"/game"} element={<GameLazy/>}/>
        <Route path={"/lottery"} element={<IphoneLazy/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
