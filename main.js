const recipeList = document.getElementById("recipeList");
const searchBar = document.getElementById("searchBar");
let recipes = [];

let sameIngredients = [];
let singleIngredients = [];

let sameAppareil = [];
let singleAppareil = [];

let sameUstensils = [];
let singleUstensils = [];

// searchBar for ingredient / apparel / ustentils
const ingredientFilter = document.getElementById("ingredientFilter");
const ingredientUl = document.getElementById("uniIngredient");

const appareilFilter = document.getElementById("appareilFilter");
const appareilUl = document.getElementById("uniAppareil");

const ustensilesFilter = document.getElementById("ustensilesFilter");
const ustensilesUl = document.getElementById("uniUstensiles");

//Tags
let tagList = document.getElementById("tagList");

let tagActive = [];

//! SearchBars Algorithm
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const arrayIngredient = recipe.ingredients.map((ingredient) => {
      return ingredient.ingredient.toLowerCase();
    });
    console.log(arrayIngredient);

    return (
      recipe.name.toLowerCase().includes(searchString) ||
      arrayIngredient.includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString)
    );
  });
  displayRecipes(filteredRecipes);
});

//! Ingredient SearchBar
ingredientFilter.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredIngredient = singleIngredients.filter((ingredient) => {
    return ingredient.toLowerCase().includes(searchString);
  });
  displayIngredient(filteredIngredient);
});

//! Appareil SearchBar
appareilFilter.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredAppareil = singleAppareil.filter((appareil) => {
    return appareil.toLowerCase().includes(searchString);
  });
  displayAppareil(filteredAppareil);
});

//! Ustentils SearchBar
ustensilesFilter.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredUstentiles = singleUstensils.filter((ustentils) => {
    return ustentils.toLowerCase().includes(searchString);
  });
  displayUstensiles(filteredUstentiles);
});

//! Fetch Function

const loadRecipes = async () => {
  try {
    const res = await fetch("/recipes.json");
    recipes = await res.json();
    displayRecipes(recipes);

    //* Single Out Ingredients
    const recipesIngredients = recipes.filter((recipe) => {
      const multipleIngRecipes = recipe.ingredients;
      multipleIngRecipes.filter((recipe) => {
        sameIngredients.push(recipe.ingredient);
      });
    });
    singleIngredients = [...new Set(sameIngredients)];
    displayIngredient(singleIngredients);
    let ingUlChild = [...new Set(ingredientUl.children)];
    console.log(ingUlChild);

    //* Single Out Appareil
    const recipesAppareil = recipes.filter((recipe) => {
      const multipleApp = recipe.appliance;
      sameAppareil.push(multipleApp);
    });
    singleAppareil = [...new Set(sameAppareil)];
    displayAppareil(singleAppareil);

    //* Single Out Ustensiles
    const recipesUstensils = recipes.filter((recipe) => {
      const multipleUst = recipe.ustensils;
      multipleUst.filter((ust) => {
        sameUstensils.push(ust);
      });
    });
    singleUstensils = [...new Set(sameUstensils)];
    displayUstensiles(singleUstensils);
  } catch (err) {
    console.log(err);
  }
};

//TODO 2] add event listener keyup on dropdown research input
//TODO 3] add array of active tag that later on will be add to searchBar
//TODO filtering version --> displayRecipes(ActiveTag)

//! Display Functions

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

const displayIngredient = (ingredients) => {
  const htmlString = ingredients
    .map((ingredient) => {
      return `<li data-name="${ingredient}">${ingredient}</li>`;
    })
    .join("");

  ingredientUl.innerHTML = htmlString;
};

const displayAppareil = (appareil) => {
  const htmlString = appareil
    .map((appa) => {
      return `<li data-name="${appa}"">${appa}</li>`;
    })
    .join("");
  appareilUl.innerHTML = htmlString;
};

console.log(tagList);

const displayUstensiles = (Ustensiles) => {
  const htmlString = Ustensiles.map((ust) => {
    return `<li data-name=${ust}>${ust}</li>`;
  }).join("");
  ustensilesUl.innerHTML = htmlString;
};

//! Tag Display
// function close(value) {
//   window.setTimeout(() => {
//     value.display = "none";
//   });
// }

const renderIngredientTag = (ingredient) => {
  tagActive.push(ingredient);
  const htmlString = `<div class="tagAppearanceIngredient">${ingredient} <i class="fas fa-times"></i></div>`;
  tagList.innerHTML = htmlString;
};

const renderAppareilTag = (appareil) => {
  tagActive.push(appareil);
  const htmlString = `<div class="tagAppearanceAppliance">${appareil} <i class="fas fa-times"></i></div>`;
  tagList.innerHTML = htmlString;
};

const renderUstentilesTag = (ustensile) => {
  tagActive.push(ustensile);
  const htmlString = `<div class="tagAppearanceUstensils">${ustensile} <i class="fas fa-times"></i></div>`;
  tagList.innerHTML = htmlString;
};

console.log(tagActive);

loadRecipes();
