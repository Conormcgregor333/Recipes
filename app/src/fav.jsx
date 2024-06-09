import { useContext, useState } from "react";
import { context } from "./App";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Details from "./details";
export default function Fav() {
  let { fav, setFav, favcount, setfavcount } = useContext(context);
  let [bool, setBool] = useState(false);
  function remove(item) {
    let i = fav.indexOf(item);
    fav.splice(i, 1);
    setBool(!bool);
    setfavcount(fav.length);
  }
  return (
    <div>
      {fav.length > 0 ? (
        <div className="fav-list">
          {fav.map((index) => {
            return (
              <div className="fav-card" key={index.id}>
                <img
                  src={index.image_url}
                  alt=""
                  /* style={{ width: 300, height: 300 }} */
                />
                <p
                  style={{ fontWeight: "bolder", textTransform: "capitalize" }}
                >
                  {index.title}
                </p>
                <p style={{ color: "green" }}>{index.publisher}</p>
                <button
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Remove from favorites
                </button>
                <Link className="fav-details" to={`/recipe-item/${index.id}`}>
                  <p> How to make</p>
                </Link>
                <Routes>
                  <Route path="/recipe-item/:id" element={<Details />} />
                </Routes>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>No favorites added yet.</h3>
      )}
    </div>
  );
}
