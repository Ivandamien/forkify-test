import View from './view';

import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; //Parcel 2


class BookmarksView extends View {
    parentElement = document.querySelector('.bookmarks__list');
    errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it:)';
    message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    generateMarkup() {
        console.log(this.data);
        return this.data.map(bookmark => previewView.render(bookmark, false)).join('');
    }


}

export default new BookmarksView();