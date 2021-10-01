const recipesGallery = document.getElementById("RecipeGallery");
export default class Recipes {
  constructor(id, name, servings, ingredients, time, description) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
  }

  render() {
    const recipesDiv = document.createElement("div");
    recipesDiv.classList.add("Recipes");
    const recipeImg = document.createElement("img");
    recipeImg.setAttribute("src", " ");
    recipeImg.classList.add("RecipesImg");
    const recipesDescription = document.createElement("div");
    const recipeTitleTime = document.createElement("div");
    recipeTitleTime.classList.add("RecipeTitleTime");
    const recipeTitle = document.createElement("div");
    recipeTitle.innerHTML = this.name;
    const recipeTime = document.createElement("div");
    recipeTime.innerHTML = `<i class="far fa-clock"></i>` + this.time;

    const ingredientSteps = document.createElement("div");
    ingredientSteps.classList.add("IngredientSteps");

    const ingredients = document.createElement("div");

    const ingredientUL = document.createElement("ul");

    this.ingredients.forEach((ingredients) => {
      let li = document.createElement("li");
      ingredientUL.appendChild(li);

      li.innerText =
        ingredients.ingredient +
        " " +
        ingredients.quantity +
        " " +
        ingredients.unit;
    });

    const recipeSteps = document.createElement("p");
    recipeSteps.innerHTML = this.description;

    ingredients.appendChild(ingredientUL);
    ingredientSteps.appendChild(ingredients);
    ingredientSteps.appendChild(recipeSteps);

    recipeTitleTime.appendChild(recipeTitle);
    recipeTitleTime.appendChild(recipeTime);

    recipesDescription.appendChild(recipeTitleTime);
    recipesDescription.appendChild(ingredientSteps);

    recipesDiv.appendChild(recipeImg);
    recipesDiv.appendChild(recipesDescription);

    recipesGallery.appendChild(recipesDiv);
  }
}
