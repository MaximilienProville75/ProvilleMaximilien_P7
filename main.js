const recipeList = document.getElementById("recipeList");
const searchBar = document.getElementById("searchBar");
let recipes = [];
let ingredients = [];
let recipesIng;

// searchBar for ingredient / apparel / ustentils
const ingredientFilter = document.getElementById("ingredientFilter");
const ingredientUl = document.getElementById("uniIngredient");

const appareilFilter = document.getElementById("appareilFilter");
const appareilUl = document.getElementById("uniAppareil");

const ustensilesFilter = document.getElementById("ustensilesFilter");
const ustensilesUl = document.getElementById("uniUstensiles");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const arrayIngredient = recipe.ingredients.map((ingredient) => {
      return ingredient.ingredient.toLowerCase();
    });

    return (
      recipe.name.toLowerCase().includes(searchString) ||
      arrayIngredient.includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString)
    );
  });
  displayRecipes(filteredRecipes);
});

const loadRecipes = async () => {
  try {
    const res = await fetch("/recipes.json");
    recipes = await res.json();
    displayRecipes(recipes);
  } catch (err) {
    console.log(err);
  }
};

//TODO 1] add event listener onclick to show the dropDown menu of filtering
//TODO 2] add event listener keyup on dropdown research input
//TODO 3] add array of active tag that later on will be add to searchBar
//TODO filtering version --> displayRecipes(ActiveTag)

console.log(ingredients);

const displayRecipes = (recipes) => {
  const htmlString = recipes

    .map((recipe) => {
      const recipeIngredient = recipe.ingredients;

      return `
    <li class="Recipes">
      <div class="RecipesBg">
      <img src=" "  class="RecipesImg"/>
      </div>
        <div class="RecipeDescription">
          <div class="RecipeTitleTime"> 
            <div class="RecipeTitle">${recipe.name}</div>
            <div class="RecipeTime"><i class="far fa-clock"></i>${
              recipe.time
            } min</div>
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
            <p class="recipeDescription">${recipe.description}</p>
          </div>
        </div>
    </li>
    `;
    })
    .join("");
  recipeList.innerHTML = htmlString;
};

const displayIngredients = (ingredients) => {
  const htmlString = ingredients;

  htmlString.filter((item) => {
    return `<li class="ingredients">${item}</li>`;
  });
  ingredientUl.innerHTML = htmlString;
};

loadRecipes();
