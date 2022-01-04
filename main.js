const recipeList = document.getElementById("recipeList");
const searchBar = document.getElementById("searchBar");
let recipes = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipesName = recipes.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  displayRecipes(filteredRecipesName);
});

const loadRecipes = async () => {
  try {
    const res = await fetch("/recipes.json");
    recipes = await res.json();
    displayRecipes(recipes);
    // console.log(recipes);
  } catch (err) {
    console.log(err);
  }
};

const displayRecipes = (recipes) => {
  const htmlString = recipes

    .map((recipe) => {
      const recipeIngredient = recipe.ingredients;

      return `
    <li class="Recipes">
      <img src=" "  class="RecipesImg"/>
        <div class="RecipeDescription">
          <div class="RecipeTitleTime"> 
            <div class="RecipeTitle">${recipe.name}</div>
            <div class="RecipeTime"><i class="far fa-clock"></i>${
              recipe.time
            }</div>
          </div>
          <div class="IngredientSteps">
            <div class="Ingredients">
              <ul class="IngredientUl">
                ${recipeIngredient.map(
                  (recipe) =>
                    `<li>${recipe.ingredient} ${recipe.quantity} ${
                      recipe.unit === undefined ? "" : recipe.unit
                    }</li>`
                )}
              </ul>
            </div>
            <p>${recipe.description}</p>
          </div>
        </div>
    </li>
    `;
    })
    .join("");
  recipeList.innerHTML = htmlString;
};

loadRecipes();
