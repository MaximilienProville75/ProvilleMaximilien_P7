import { recipes } from "./recipes.js";
import Recipes from "./components/Recipes.js";

const recipesGallery = document.getElementById("RecipeGallery");
const filterByIngredientsDropDown = document.getElementById(
  "filterByIngredientsList"
);
const filterByUstensils = document.getElementById("filterByUstensilsList");
const filterByAppliance = document.getElementById("filterByApplianceList");
const tagList = document.getElementById("tagList");

let allRecipes = [];
let sameIngredient = [];
let sameUstensils = [];
let sameAppliance = [];
let allRecipesName = [];
let ActiveTAG = [];
// let ustensilsTag = [];
// let applianceTag = [];
//All the active tag for ingredient are in
// it those will  be very important for filtering the
// final recipe render

// Tag generator Section [ingredients / Ustenstils / Appareille]
function tagApperanceIngredient(value) {
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = value;
  tagAppearanceX.classList.add("tagAppearanceIngredient");
  tagAppearanceX.addEventListener("click", () => {
    close();
  });
  tagList.appendChild(tagAppearanceX);
}

function tagApperanceUstensils(value) {
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = value;
  tagAppearanceX.classList.add("tagAppearanceUstensils");
  tagList.appendChild(tagAppearanceX);
}

function tagAppearanceAppliance(value) {
  const tagAppearanceX = document.createElement("div");
  tagAppearanceX.innerHTML = value;
  tagAppearanceX.classList.add("tagAppearanceAppliance");
  tagList.appendChild(tagAppearanceX);
}

function close() {
  const tagListClose = document.getElementById("tagList");
  window.setTimeout(() => {
    tagListClose.remove(tagListClose);
  });
}
//  ==============================================================

// filtering listing [ingredients / Ustenstils / Appareille]
function renderIngredientsList(ingredient) {
  const ingredientAnchor = document.createElement("a");
  ingredientAnchor.setAttribute("href", "#");
  const ingredientsLi = document.createElement("li");
  ingredientsLi.addEventListener("click", () => {
    ActiveTAG.push(ingredient);
    tagApperanceIngredient(ingredient);
  });
  ingredientsLi.innerHTML = ingredient;
  ingredientAnchor.appendChild(ingredientsLi);
  filterByIngredientsDropDown.appendChild(ingredientAnchor);
}
function renderUstensilsList(ustensil) {
  const ustensilAnchor = document.createElement("a");
  ustensilAnchor.setAttribute("href", "#");
  const ustensilLi = document.createElement("li");
  ustensilLi.addEventListener("click", () => {
    ActiveTAG.push(ustensil);
    tagApperanceUstensils(ustensil);
  });
  ustensilLi.innerHTML = ustensil;
  ustensilAnchor.appendChild(ustensilLi);
  filterByUstensils.appendChild(ustensilAnchor);
}
function renderApplianceList(appliance) {
  const applianceAnchor = document.createElement("a");
  applianceAnchor.setAttribute("href", "#");
  const applianceLi = document.createElement("li");
  applianceLi.addEventListener("click", () => {
    ActiveTAG.push(appliance);
    tagAppearanceAppliance(appliance);
  });
  applianceLi.innerHTML = appliance;
  applianceAnchor.appendChild(applianceLi);
  filterByAppliance.appendChild(applianceAnchor);
}
console.log(ActiveTAG);
//  ==============================================================

recipes.forEach((recipe) => {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = recipe;

  let newRecipe = new Recipes(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  );

  newRecipe.render();
  allRecipes.push(newRecipe);
  allRecipesName.push(newRecipe.name);

  ingredients.forEach((ingredient) => {
    sameIngredient.push(ingredient.ingredient.toLowerCase());
  });
  ustensils.forEach((ustensil) => {
    sameUstensils.push(ustensil.toLowerCase());
  });
  sameAppliance.push(appliance.toLowerCase());
});

//  ==============================================================

// Filtering the Arrays to have unique Value in it.
let filteredIngredient = [...new Set(sameIngredient)];
filteredIngredient.forEach((ingredient) => {
  renderIngredientsList(ingredient);
});
let filteredUstensils = [...new Set(sameUstensils)];
filteredUstensils.forEach((ustensil) => {
  renderUstensilsList(ustensil);
});
let filteredAppliance = [...new Set(sameAppliance)];
filteredAppliance.forEach((appliance) => {
  renderApplianceList(appliance);
});

//  ==============================================================

function filterRecipe(query) {
  recipesGallery.innerHTML = "";

  const search = document.querySelector(".search input");
  const userInput = search.value.trim();

  allRecipesName.map((recipe) => {
    userInput.split(" ").map((word) => {
      if (recipe.toLowerCase().indexOf(word.toLowerCase()) != -1) {
        recipesGallery.innerHTML += `<p>${recipe}</p>`;
      }
    });
  });
}

filterRecipe(" ");
console.log(allRecipes);
console.log(allRecipesName);
console.log(filteredIngredient);
console.log(filteredAppliance);
console.log(filteredUstensils);
// let userInput = document.getElementById("userInput");
// console.log(userInput);

// Get the user INPUT from the searchBar
// function userInput() {}

// // Showcase the filtered recipes array => base on the userInput
// function filterByIngredient() {}

// // Showcase the filtered recipes array => base on the filterByIngredient
// function filterByAppareil() {}

// // Showcase the filtered recipes array => base on the filterByIngredient
// function filterByUstensiles() {}
