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
    const arrayUstentils = recipe.ustensils.map((us) => {
      return us.toLowerCase();
    });

    return (
      recipe.name.toLowerCase().includes(searchString) ||
      arrayIngredient.includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString) ||
      recipe.appliance.toLowerCase().includes(searchString) ||
      arrayUstentils.includes(searchString)
    );
  });
  tagFilteringRecipe(tagActive, filteredRecipes);
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
      filterNewTagList(ing.innerHTML);
    });
  });
  document.getElementById("uniIngredient").classList.add("show");
  dropDownBtn1.classList.add("rotate");
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
      filterNewTagList(ing.innerHTML);
    });
  });
  document.getElementById("uniAppareil").classList.add("show");
  dropDownBtn2.classList.add("rotate");
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
      filterNewTagList(ing.innerHTML);
    });
  });
  document.getElementById("uniUstensiles").classList.add("show");
  dropDownBtn3.classList.add("rotate");
});

//! Fetch Function

const loadRecipes = async () => {
  try {
    const res = await fetch("/recipes.json");
    recipes = await res.json();
    displayRecipes(recipes);

    //* Single Out Ingredients
    recipes.forEach((recipe) => {
      const multipleIngRecipes = recipe.ingredients;
      multipleIngRecipes.forEach((recipe) => {
        sameIngredients.push(recipe.ingredient);
      });
    });
    singleIngredients = [...new Set(sameIngredients)];
    displayIngredient(singleIngredients);

    let ingUlChild = [...new Set(ingredientUl.children)];
    ingUlChild.forEach((ing) => {
      ing.addEventListener("click", () => {
        renderIngredientTag(ing.innerHTML);
        filterNewTagList(ing.innerHTML);
      });
    });

    //* Single Out Appareil
    recipes.forEach((recipe) => {
      const multipleApp = recipe.appliance;
      sameAppareil.push(multipleApp);
    });
    singleAppareil = [...new Set(sameAppareil)];
    displayAppareil(singleAppareil);

    let appUlChild = [...new Set(appareilUl.children)];
    appUlChild.forEach((app) => {
      app.addEventListener("click", () => {
        renderAppareilTag(app.innerHTML);
        filterNewTagList(app.innerHTML);
      });
    });

    //* Single Out Ustensiles
    recipes.forEach((recipe) => {
      const multipleUst = recipe.ustensils;
      multipleUst.forEach((ust) => {
        sameUstensils.push(ust);
      });
    });
    singleUstensils = [...new Set(sameUstensils)];
    displayUstensiles(singleUstensils);

    let ustUlChild = [...new Set(ustensilesUl.children)];
    ustUlChild.forEach((ust) => {
      ust.addEventListener("click", () => {
        renderUstentilesTag(ust.innerHTML);
        filterNewTagList(ust.innerHTML);
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
            <p class="recipeDescription ">${recipe.description}</p>
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
      return `<li data-name="${ingredient}">${ingredient}</div>`;
    })
    .join("");
  ingredientUl.innerHTML = htmlString;
};

const displayAppareil = (appareil) => {
  const htmlString = appareil
    .map((appa) => {
      return `<li data-name="${appa}">${appa}</li>`;
    })
    .join("");
  appareilUl.innerHTML = htmlString;
};

const displayUstensiles = (Ustensiles) => {
  const htmlString = Ustensiles.map((ust) => {
    return `<li data-name="${ust}">${ust}</li>`;
  }).join("");
  ustensilesUl.innerHTML = htmlString;
};

//! Tag Display
const renderIngredientTag = (ingredient) => {
  const globalTagApperance = document.createElement("div");
  globalTagApperance.classList.add("tagAppearanceIngredient");
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = ingredient;
  const iconCross = document.createElement("div");
  iconCross.innerHTML = `<i class="far fa-times-circle"></i>`;
  globalTagApperance.addEventListener("click", () => {
    close(globalTagApperance);
    filterNewTagList(tagAppearanceX);
  });
  globalTagApperance.appendChild(tagAppearanceX);
  globalTagApperance.appendChild(iconCross);
  tagList.appendChild(globalTagApperance);
  tagActive.push(ingredient);
};
const renderAppareilTag = (appareil) => {
  const globalTagApperance = document.createElement("div");
  globalTagApperance.classList.add("tagAppearanceAppliance");
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = appareil;
  const iconCross = document.createElement("div");
  iconCross.innerHTML = `<i class="far fa-times-circle"></i>`;
  globalTagApperance.addEventListener("click", () => {
    close(globalTagApperance);
    filterNewTagList(tagAppearanceX);
  });
  globalTagApperance.appendChild(tagAppearanceX);
  globalTagApperance.appendChild(iconCross);
  tagList.appendChild(globalTagApperance);
  tagActive.push(appareil);
};

const renderUstentilesTag = (ustensile) => {
  const globalTagApperance = document.createElement("div");
  globalTagApperance.classList.add("tagAppearanceUstensils");
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = ustensile;
  const iconCross = document.createElement("div");
  iconCross.innerHTML = `<i class="far fa-times-circle"></i>`;
  globalTagApperance.addEventListener("click", () => {
    close(globalTagApperance);
    filterNewTagList(tagAppearanceX);
  });
  globalTagApperance.appendChild(tagAppearanceX);
  globalTagApperance.appendChild(iconCross);
  tagList.appendChild(globalTagApperance);
  tagActive.push(ustensile);
};

const close = (value) => {
  window.setTimeout(() => {
    value.style.display = "none";
  });
};

//! Tag Filtering

const filterNewTagList = (value) => {
  const index = tagActive.indexOf(value.textContent);
  if (index > -1) {
    tagActive.splice(index, 1);
  }

  tagActive.forEach((tag) => {
    tagFilteringRecipe(tag, recipes);
  });

  if (tagActive.length === 0) {
    displayRecipes(recipes);
    displayAppareil(singleAppareil);
    displayIngredient(singleIngredients);
    displayUstensiles(singleUstensils);
  }
};

const tagFilteringRecipe = (tag, recipes) => {
  const filteredRecipes = recipes.filter((recipe) => {
    const arrayIngredient = recipe.ingredients.map((ingredient) => {
      return ingredient.ingredient.toLowerCase();
    });
    const arrayUstentils = recipe.ustensils.map((us) => {
      return us.toLowerCase();
    });
    const stringTag = String(tag);
    const tagLower = stringTag.toLowerCase();
    return (
      // recipe.name.toLowerCase().includes(tagLower) ||
      arrayIngredient.includes(tagLower) ||
      // recipe.description.toLowerCase().includes(tagLower) ||
      recipe.appliance.toLowerCase().includes(tagLower) ||
      arrayUstentils.includes(tagLower)
    );
  });

  console.log(filteredRecipes);

  let ingArr = [];
  let appArr = [];
  let ustArr = [];
  filteredRecipes.map((recipe) => {
    const recipeIng = recipe.ingredients;
    const recipeApp = recipe.appliance;
    const recipeUst = recipe.ustensils;
    recipeIng.map((ing) => {
      const singleIng = ing.ingredient;
      ingArr.push(singleIng);
    });
    recipeUst.map((ust) => {
      ustArr.push(ust);
    });
    appArr.push(recipeApp);
  });
  let singleUst = [...new Set(ustArr)];
  let singleApp = [...new Set(appArr)];

  displayAppareil(singleApp);
  displayIngredient(ingArr);
  displayUstensiles(singleUst);

  let ingUlChild = [...new Set(ingredientUl.children)];
  ingUlChild.forEach((ing) => {
    ing.addEventListener("click", () => {
      renderIngredientTag(ing.innerHTML);
      filterNewTagList(ing.innerHTML);
    });
  });
  console.log(ingUlChild);

  let appUlChild = [...new Set(appareilUl.children)];
  appUlChild.forEach((app) => {
    app.addEventListener("click", () => {
      renderAppareilTag(app.innerHTML);
      filterNewTagList(app.innerHTML);
    });
  });
  console.log(appUlChild);

  let ustUlChild = [...new Set(ustensilesUl.children)];
  ustUlChild.forEach((ust) => {
    ust.addEventListener("click", () => {
      renderUstentilesTag(ust.innerHTML);
      filterNewTagList(ust.innerHTML);
    });
  });
  console.log(ustUlChild);
  displayRecipes(filteredRecipes);
};

//*DropDown Functions

const dropDownBtn1 = document.getElementById("arrowDropDown1");
const dropDownBtn2 = document.getElementById("arrowDropDown2");
const dropDownBtn3 = document.getElementById("arrowDropDown3");

dropDownBtn1.onclick = function () {
  document.getElementById("uniIngredient").classList.toggle("show");
  dropDownBtn1.classList.toggle("rotate");
};
dropDownBtn2.onclick = function () {
  document.getElementById("uniAppareil").classList.toggle("show");
  dropDownBtn2.classList.toggle("rotate");
};
dropDownBtn3.onclick = function () {
  document.getElementById("uniUstensiles").classList.toggle("show");
  dropDownBtn3.classList.toggle("rotate");
};

loadRecipes();
