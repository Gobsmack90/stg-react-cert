import "./App.css";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Jokes from "./components/Jokes";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="search" element={<Search />} />
          <Route path="jokes" element={<Jokes />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
