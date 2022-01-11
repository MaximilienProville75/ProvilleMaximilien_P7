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

  // Utiliser sous forme de fonction
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

  let ingUlChild = [...new Set(ingredientUl.children)];
  ingUlChild.forEach((ing) => {
    ing.addEventListener("click", () => {
      renderIngredientTag(ing.innerHTML);
    });
  });
});

//! Appareil SearchBar
appareilFilter.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredAppareil = singleAppareil.filter((appareil) => {
    return appareil.toLowerCase().includes(searchString);
  });
  displayAppareil(filteredAppareil);

  let appUlChild = [...new Set(appareilUl.children)];
  appUlChild.forEach((ing) => {
    ing.addEventListener("click", () => {
      renderAppareilTag(ing.innerHTML);
    });
  });
});

//! Ustentils SearchBar
ustensilesFilter.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredUstentiles = singleUstensils.filter((ustentils) => {
    return ustentils.toLowerCase().includes(searchString);
  });
  displayUstensiles(filteredUstentiles);

  let ustUlChild = [...new Set(ustensilesUl.children)];
  ustUlChild.forEach((ing) => {
    ing.addEventListener("click", () => {
      renderUstentilesTag(ing.innerHTML);
    });
  });
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
    ingUlChild.forEach((ing) => {
      ing.addEventListener("click", () => {
        renderIngredientTag(ing.innerHTML);
        tagFilteringRecipe(ing.innerHTML, recipes);
      });
    });

    //* Single Out Appareil
    const recipesAppareil = recipes.filter((recipe) => {
      const multipleApp = recipe.appliance;
      sameAppareil.push(multipleApp);
    });
    singleAppareil = [...new Set(sameAppareil)];
    displayAppareil(singleAppareil);

    let appUlChild = [...new Set(appareilUl.children)];
    appUlChild.forEach((app) => {
      app.addEventListener("click", () => {
        renderAppareilTag(app.innerHTML);
        tagFilteringRecipe(app.innerHTML, recipes);
      });
    });

    //* Single Out Ustensiles
    const recipesUstensils = recipes.filter((recipe) => {
      const multipleUst = recipe.ustensils;
      multipleUst.filter((ust) => {
        sameUstensils.push(ust);
      });
    });
    singleUstensils = [...new Set(sameUstensils)];
    displayUstensiles(singleUstensils);

    let ustUlChild = [...new Set(ustensilesUl.children)];
    ustUlChild.forEach((ust) => {
      ust.addEventListener("click", () => {
        renderUstentilesTag(ust.innerHTML);
        tagFilteringRecipe(ust.innerHTML, recipes);
      });
    });

    tagFilteringRecipe(tagActive, recipes);
  } catch (err) {
    console.log(err);
  }
};

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
      return `<div data-name="${ingredient}">${ingredient}</div>`;
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

const displayUstensiles = (Ustensiles) => {
  const htmlString = Ustensiles.map((ust) => {
    return `<li data-name=${ust}>${ust}</li>`;
  }).join("");
  ustensilesUl.innerHTML = htmlString;
};

//! Tag Display
const renderIngredientTag = (ingredient) => {
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = ingredient + `<i class="fas fa-times"></i>`;
  tagAppearanceX.setAttribute("data-name", ingredient);
  tagAppearanceX.classList.add("tagAppearanceIngredient");
  tagAppearanceX.addEventListener("click", () => {
    close(tagAppearanceX);
    filterNewTagList(tagAppearanceX);
  });
  tagList.appendChild(tagAppearanceX);
  tagActive.push(ingredient);
};
const renderAppareilTag = (appareil) => {
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = appareil + `<i class="fas fa-times"></i>`;
  tagAppearanceX.classList.add("tagAppearanceAppliance");
  tagAppearanceX.addEventListener("click", () => {
    close(tagAppearanceX);
    filterNewTagList(tagAppearanceX);
  });
  tagList.appendChild(tagAppearanceX);
  tagActive.push(appareil);
};

const renderUstentilesTag = (ustensile) => {
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = ustensile + `<i class="fas fa-times"></i>`;
  tagAppearanceX.classList.add("tagAppearanceUstensils");
  tagAppearanceX.addEventListener("click", () => {
    close(tagAppearanceX);
    filterNewTagList(tagAppearanceX);
  });
  tagList.appendChild(tagAppearanceX);
  tagActive.push(ustensile);
};

// TODO
// Whenever function close is used, the tagActive array must delete that value and load the recipe again without that value in it

const close = (value) => {
  window.setTimeout(() => {
    value.style.display = "none";
  });
};

//! Tag Filtering

const tagFilteringRecipe = (tag, recipes) => {
  const filteredRecipes = recipes.filter((recipe) => {
    const arrayIngredient = recipe.ingredients.map((ingredient) => {
      return ingredient.ingredient.toLowerCase();
    });

    const stringTag = String(tag);
    const tagLower = stringTag.toLowerCase();

    return (
      recipe.name.toLowerCase().includes(tagLower) ||
      arrayIngredient.includes(tagLower) ||
      recipe.description.toLowerCase().includes(tagLower)
    );
  });
  displayRecipes(filteredRecipes);
};

loadRecipes();

const filterNewTagList = (value) => {
  const index = tagActive.indexOf(value.textContent);
  if (index > -1) {
    tagActive.splice(index, 1);
  }

  tagActive.map((tag) => {
    tagFilteringRecipe(tag, recipes);
  });
};
