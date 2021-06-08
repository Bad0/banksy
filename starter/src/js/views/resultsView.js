import View from "./view.js";
import icons from "url:../../img/icons.svg";

class resultsView extends View {
  _parentElement = document.querySelector(".search-results");

  _generateMarkup() {
    console.log("aaa" + this._data);
    const x = this._data.map(function (el) {
      return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${el.id}">
          <figure class="preview__fig">
            <img src="${el.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${el.title}</h4>
            <p class="preview__publisher">${el.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
    });
    console.log(x);
    return x;
  }
}

export default new resultsView();
