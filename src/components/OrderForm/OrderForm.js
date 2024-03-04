import { useState } from "react";

function OrderForm({ addOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert("Please select at least one ingredient!");
      return;
    }
    if (name.trim() === "") {
      alert("Please enter a name!");
      return;
    }
    const newOrder = {
      id: Date.now(),
      name: name,
      ingredients: ingredients,
    };

    addOrder(newOrder);
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };
  console.log("ingredients: ", ingredients);

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        type="button"
        key={ingredient}
        name={ingredient}
        className={ingredient + '-btn'}
        onClick={() => handleIngredientClick(ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
      className="form-name"
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleInputChange}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button type="submit" className='submit-btn' onClick={handleSubmit} disabled={ingredients.length === 0}>
        Submit Order
      </button>
    </form>
  );
}

export default OrderForm;
