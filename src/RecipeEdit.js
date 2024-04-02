import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './RecipeEdit.css';

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        console.log("Response data:", data); // Debugging: Check the response data
        setRecipe(data);
      })
      .catch((err) => {
        console.log("Error:", err.message); // Debugging: Check any errors
        setError(err.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/recipies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((res) => {
        if (res.ok) {
          alert("Recipe saved successfully.");
          navigate("/AdminList");
        } else {
          alert("Failed to save the recipe.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  if (error) {
    return <div className="recipe-edit-container"><p className="error-message">{error}</p></div>;
  }

  if (!recipe) {
    return <div className="recipe-edit-container">Loading...</div>;
  }

  return (
    <div className="recipe-edit-container">
      <h2>Edit Recipe</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={recipe.Name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          type:
          <textarea
            name="Type"
            value={recipe.type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Author:
          <textarea
            name="Author"
            value={recipe.Author}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ingredients:
          <textarea
            name="Ingredients"
            value={recipe.Ingredients}
            onChange={handleInputChange}
          />
        </label>
        <label>
          url:
          <textarea
            name="url"
            value={recipe.url}
            onChange={handleInputChange}
          />
        </label>
        
        
        <label>
          Description:
          <textarea
            name="Description"
            value={recipe.Description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Method:
          <textarea
            name="Method"
            value={recipe.Method}
            onChange={handleInputChange}
          />
        </label>

        {/* Add more input fields for other editable properties */}
      </form>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RecipeEdit;
