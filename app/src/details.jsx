import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { context } from "./App";
import "./App.css";
export default function Details() {
  let { recipeDetails, setRecipeDetails } = useContext(context);
  let { id } = useParams();
  useEffect(() => {
    let getData = async () => {
      let d = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=343c1b1e-5476-4ef4-b1ba-77bc2bdfa347`
      );
      let k = await d.json();
      if (k) {
        console.log(k.data.recipe);
        console.log(k.data.recipe.ingredients);
        setRecipeDetails(k.data.recipe);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {recipeDetails.length != 0 ? (
        <div className="food-details">
          <img
            src={recipeDetails.image_url}
            alt=""
            /*  style={{ width: 300, height: 300 }} */
          />
          <h3>Recipe for {recipeDetails.title}</h3>
          <h4 style={{ color: "green" }}>Ingredients List</h4>
          {recipeDetails.ingredients.map((index) => {
            return (
              <div>
                <div style={{ color: "green" }}>• {index.description}</div>
                {index.quantity && index.unit ? (
                  <div>
                    <span style={{ color: "red" }}>Quantity</span> :{" "}
                    {index.quantity + " " + index.unit}
                  </div>
                ) : (
                  <div>
                    {" "}
                    <span style={{ color: "red" }}>Quantity : </span> As per
                    taste
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <h3>no recipes to show</h3>
      )}
    </div>
  );
  /*  return (
    <div>
      <h3>{recipeDetails.title}</h3>
      <img src={recipeDetails.image_url} alt="" />
      <h4>{recipeDetails.cooking_time}</h4>
      <ul>
        {recipeDetails.ingredients.map((index) => {
          return <li>{index}</li>;
        })}
      </ul>
    </div>
  ); */
}
/*
useParams is a hook proided by the react-router that helps to access the dynamic parameter
 of the path of the route (basically the url) 
 */
