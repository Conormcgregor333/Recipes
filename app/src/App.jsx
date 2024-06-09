import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Details from "./details";
import Home from "./home";
import Fav from "./fav";
import { Routes, Route, Link } from "react-router-dom";
import { createContext } from "react";
export let context = createContext();
function App() {
  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [fav, setFav] = useState([]);
  let [favcount, setfavcount] = useState(0);
  let [clicked, setClicked] = useState(false);
  let [recipeDetails, setRecipeDetails] = useState([]);
  function fetchRecipe(param) {
    let getData = async () => {
      let d = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${param}&key=343c1b1e-5476-4ef4-b1ba-77bc2bdfa347`
      );
      let k = await d.json();
      if (k) {
        setLoading(false);
        let x = k?.data?.recipes;
        setData(x);
        console.log(k.data.recipes);
      }
    };
    getData();
  }
  function handleClick() {
    console.log(search);
    fetchRecipe(search);
    setClicked(true);
  }
  return (
    <context.Provider
      value={{
        search,
        setSearch,
        handleClick,
        data,
        fav,
        setFav,
        clicked,
        setClicked,
        favcount,
        setfavcount,
        loading,
        recipeDetails,
        setRecipeDetails,
      }}
    >
      <div className="navbar">
        <div className="nav">
          <a href="#" className="logo-cont">
            <img
              className="logo"
              style={{ height: 60, width: 60 }}
              src="https://i.pinimg.com/originals/c9/85/8a/c9858a215e51e51783c7b005b587aaf0.jpg"
              alt=""
            />
          </a>

          <div className="heading"></div>
          <div>
            <Link style={{ textDecoration: "none", color: "orange" }} to={"*"}>
              Home
            </Link>
          </div>

          <div>
            <Link
              style={{ textDecoration: "none", color: "orange" }}
              to={"/fav"}
            >
              <div className="heart-container">
                <p className="heart"> 💖</p>
                <p className="fav-cnt">{favcount}</p>
              </div>
            </Link>
          </div>

          <input
            className="before560"
            placeholder="enter your cravings...."
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setClicked(false);
            }}
          />
          <button
            className="before560"
            onClick={() => {
              handleClick();
              setLoading(true);
            }}
          >
            search
          </button>
        </div>

        <div className="after560">
          <input
            placeholder="enter your cravings...."
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setClicked(false);
            }}
          />
          <button
            onClick={() => {
              handleClick();
              setLoading(true);
            }}
          >
            search
          </button>
        </div>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </context.Provider>
  );
}

export default App;
/* The path could be anything like /"anything" , but it has to be of a similar structure as the "to" of the link.
 we have kept path and to of the home page as "*" as it is the home page. [the page that has same url as when we do npm run dev]*/
