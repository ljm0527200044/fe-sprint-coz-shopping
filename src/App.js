import Main from "./Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Productslist from "./Productslist";
import Bookmark from "./Bookmark";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/products/list" element={<Productslist />}></Route>
        <Route path="/bookmark" element={<Bookmark />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
