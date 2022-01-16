import View from "./view";
import icons from 'url:../../img/icons.svg'; //Parcel 2
class PaginationView extends View {
    parentElement = document.querySelector('.pagination');


    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            console.log(btn);
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            console.log(goToPage)
            handler(goToPage);
        })
    }

    generateMarkup() {
        const curPage = this.data.page;

        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);
        console.log(numPages);

        //Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `
              <button data-goto="${
                curPage + 1
              }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }

        // Last Page
        if (curPage === numPages && numPages > 1) {
            return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            `;
        }

        //Other page
        if (curPage < numPages) {
            return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
            `;
        }
        //Page 1, and there are NO other pages
        return '';

    }
}
export default new PaginationView();