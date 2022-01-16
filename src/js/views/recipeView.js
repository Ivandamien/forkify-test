import View from './view';
// import icons from '../img/icons.svg'; //Parcel 1
import icons from 'url:../../img/icons.svg'; //Parcel 2
import { Fraction } from 'fractional';
// console.log(Fraction);

class RecipeView extends View {
    parentElement = document.querySelector('.recipe');
    errorMessage = 'We could not find that recipe.Please try another one!';
    message = '';

    data;
    render(data) {
        this.data = data;
        const markup = this.generateMarkup();
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);

    }

    clear() {
        this.parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
    <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    };


    renderError(message = this.errorMessage) {
        const markup = `
     <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this.message) {
        const markup = `
     <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    };

    addHandlerUpdateServings(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest(' .btn--update-servings');
            if (!btn) return
            console.log(btn);
            const updateTo = +btn.dataset.updateTo;
            if (updateTo > 0) handler(updateTo);
        });
    }


    addHandlerAddBookmark(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return
            handler();
        });
    }

    generateMarkup() {
        // console.log(this.data)
        return `
        <figure class="recipe__fig">
          <img src="${this.data.image}" alt="${
          this.data.title
        }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this.data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this.data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

           <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
          this.data.bookmarked ? '-fill' : ''
        }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.data.ingredients.map(this.generateMarkupIngredient).join('')}

        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a> 
        </div>
        `;
    }
    generateMarkupIngredient(ing) {
        return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
               ${ing.description}
              </div>
            </li>
              `;
    }
}
export default new RecipeView();