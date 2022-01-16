import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config'

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//     module.hot.accept();
// }



// https://forkify-api.herokuapp.com/v2



///////////////////////////////////////
// console.log('test')
const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        // console.log(id);
        if (!id) return;
        recipeView.renderSpinner();

        // 0. Update results view to mark selected search results
        resultView.update(model.getSearchResultsPage());

        // 1.Updating bookmarks view
        bookmarkView.update(model.state.bookmarks);

        // 2. loading recipe
        await model.loadRecipe(id);



        // 3. Rendering recipe
        recipeView.render(model.state.recipe);

    } catch (err) {
        // alert(err)
        // console.log(err);
        recipeView.renderError();
        // recipeView.renderError(`${err}`)
    }
};

const controlSearchResults = async function() {
    try {

        resultView.renderSpinner();
        console.log(resultView);
        ///1.Get search query
        const query = searchView.getQuery();
        if (!query) return;

        ///2.Load Search results 
        await model.loadSearchResults(query);

        ///3.Render results
        console.log(model.state.search.results);
        // resultView.render(model.state.search.results);
        resultView.render(model.getSearchResultsPage());

        //4.Render initial pagination buttons
        paginationView.render(model.state.search)
    } catch (err) {
        console.log(err)
    }

};

const controlPagination = function(goToPage) {
    ///1.Render New results
    resultView.render(model.getSearchResultsPage(goToPage));

    //2.Render new pagination buttons
    paginationView.render(model.state.search);
}


const controlServings = function(newServings) {
    //Update the recipe servings in state
    model.updateServings(newServings)
        //update the recipe view
        // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
    // 1. Add/remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else
        model.deleteBookmark(model.state.recipe.id);

    // 2. Update recipe view
    // recipeView.update(model.state.recipe);
    recipeView.render(model.state.recipe);

    // 3. Render bookmarks
    bookmarkView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
    bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
    try {
        //Show loading spinner
        addRecipeView.renderSpinner();

        //Upload the new recipe data
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);

        //Render recipe
        recipeView.render(model.state.recipe);

        //Success Message
        addRecipeView.renderMessage();

        //Render bookmark view
        bookmarkView.render(model.state.bookmarks)

        //Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`)


        //Close form window
        setTimeout(function() {
            addRecipeView.toggleWindow()
        }, MODAL_CLOSE_SEC * 1000);

    } catch (err) {
        console.error('siuuuu', err);
        addRecipeView.renderError(err.message);
    }


};

const init = function() {
    bookmarkView.addHandlerRender(controlBookmarks)
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe)

}
init();