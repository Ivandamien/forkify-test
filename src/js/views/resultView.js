import View from "./view";
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; //Parcel 2
class ResultsView extends View {
    parentElement = document.querySelector('.results');
    errorMessage = 'No recipes found for your query! Please try again:';
    message = '';


    generateMarkup() {
        console.log(this.data);
        return this.data.map(result => previewView.render(result, false)).join('');
    }

}


export default new ResultsView();