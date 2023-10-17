import Home from "./Routes/Home";
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import { routes } from "../routes";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path={routes.home} element={<Home/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
