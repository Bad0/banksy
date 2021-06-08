import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

const controlRecipes = async function () {
  try {
    console.log("asas");
    console.log(window);
    console.log(window.location);
    console.log(window.location.hash);
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    console.log("Buraya geldi 0");
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError("We could not find any recipe !! \n" + err);
    console.error(err);
  }
};
controlRecipes();

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPerPage());
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPerPage(goToPage));
  paginationView.render(model.state.search);
};

controlPagination();

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
}
controlSearchResult();

init();
