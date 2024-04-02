import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";


const RecipeDetails = () => {
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetch(`http://localhost:8000/recipies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Recipe not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data); // Check the response data
        setRecipe(data);
      })
      .catch((err) => {
        console.log("Error:", err.message); // Check any errors
        setError(err.message);
      });
  }, [id]);
  

  if (error) {
    return <div className="recipe-details-container"><p className="error-message">{error}</p></div>;
  }

  if (!recipe) {
    return <div className="recipe-details-container">Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h2>{recipe.Name}</h2>
      <img src={recipe.url} alt={recipe.Name} />
      <h3>Description</h3>
      <p>{recipe.Description}</p>
      <h3>Author</h3>
      <p>Author: {recipe.Author}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.Ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Method</h3>
      <ol>
        {recipe.Method.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;

