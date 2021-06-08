import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      this.renderError("Data yok");
    this._data = data;
    console.log(data);
    console.log("Parent: ", this._parentElement);
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> -->
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
