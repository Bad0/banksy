import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helper.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export async function loadRecipe(id) {
  try {
    const url = API_URL + id;
    const data = await getJSON(url);

    let recipee = data.data.recipe;
    state.recipe = {
      id: recipee.id,
      title: recipee.title,
      publisher: recipee.publisher,
      sourceUrl: recipee.source_url,
      image: recipee.image_url,
      servings: recipee.servings,
      cookingTime: recipee.cooking_time,
      ingredients: recipee.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    throw error;
  }
}

export async function loadSearchResult(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    if (!data) return;

    state.search.results = data.data.recipes.map(function (el) {
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        image: el.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw new Error(err);
  }
}

export function getSearchResultsPerPage(page = state.search.page) {
  state.search.page = page;
  const start = (state.search.page - 1) * state.search.resultsPerPage;
  const end = state.search.page * state.search.resultsPerPage;
  console.log("start-end", start, end);
  return state.search.results.slice(start, end);
}
