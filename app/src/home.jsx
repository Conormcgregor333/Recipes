import { useContext, useState } from "react";
import { context } from "./App";
import { Link, Routes, Route } from "react-router-dom";
import Details from "./details";
import "./App.css";

export default function Home() {
  function goup() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  let { search, data, fav, setFav, clicked, favcount, setfavcount, loading } =
    useContext(context);
  function handleFav(item) {
    fav.push(item);
    setfavcount(fav.length);
  }
  if (loading) {
    return <h3>Loading....please wait</h3>;
  }
  return (
    <div>
      {clicked ? (
        <h1>Here are some {search} recipes.</h1>
      ) : (
        <h3>Search for a recipe</h3>
      )}

      <div className="recipe-list">
        {data.map((index) => {
          return (
            <div className="card" key={index.id}>
              <img
                src={index.image_url}
                alt=""
                /* style={{ width: 300, height: 300 }} */
              />

              <p style={{ fontWeight: "bolder", textTransform: "capitalize" }}>
                {index.title}
              </p>
              <p style={{ color: "green" }}>{index.publisher}</p>
              <button
                onClick={() => {
                  handleFav(index);
                }}
              >
                Add to favorites
              </button>
              <Link className="show-details" to={`/recipe-item/${index.id}`}>
                <p> How to make</p>
              </Link>
              <Routes>
                <Route path="/recipe-item/:id" element={<Details />} />
              </Routes>
            </div>
          );
        })}
      </div>
      {data.length > 0 ? (
        <img
          onClick={() => {
            goup();
          }}
          className="up"
          style={{ height: 40, width: 40 }}
          src="https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Top-2-1024.png"
          alt=""
        />
      ) : null}
    </div>
  );
}
/*
Link has "to" attribute and Route has "path" attribute . Their structure has to be same . Above is an example of a dynamic route. 
Route has an attribute path which has :index in it. ":" tells that the path is dynamic i.e the index can have any value in its place.
Similarly in the Link's "to" attribute we used string literals to give dynamic value "index" in it. And whenever the user clicks
on any list item , the user is directed to a page with url having the list's id . in the url tab. And we can access that url's id by
using a hook that react-router provides i.e useParams , it helps use to access the dynamic parameter (index here) of the path of
the route.
 */

/*  <ul>
        {[...Array(5)].map((_, index) => {
          return (
            <li key={index}>
              <Link to={`/recipe-item/:${index}`}>
                <div>item {index}</div>
              </Link>
              <div
                onClick={() => {
                  handleFav(`item${index}`);
                }}
              >
                Add+
              </div>
              <Routes>
                <Route path="/recipe-item/:index" element={<Details />} />
              </Routes>
            </li>
          );
        })}
      </ul> */
