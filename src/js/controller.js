import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
// 	module.hot.accept();
// }

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		resultsView.update(model.getSearchResultsPage());
		bookmarksView.update(model.state.bookmarks);

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
	} catch (error) {
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	try {
		resultsView.renderSpinner();

		const query = searchView.getQuery();

		if (!query) return;

		await model.loadSearchResults(query);

		// resultsView.render(model.state.search.results);
		resultsView.render(model.getSearchResultsPage());
		paginationView.render(model.state.search);
	} catch (error) {
		console.log(error);
	}
};

const controlPagination = function (goToPage) {
	// Render updated results
	resultsView.render(model.getSearchResultsPage(goToPage));
	// Render updated pagination buttons
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	// Update the recipe servings (in state)
	model.updateServings(newServings);

	// Update the recipe view
	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	if (!model.state.recipe.bookmarked) {
		model.addBookmark(model.state.recipe);
	} else {
		model.deleteBookmark(model.state.recipe.id);
	}

	recipeView.update(model.state.recipe);

	bookmarksView.render(model.state.bookmarks);
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
};

init();
