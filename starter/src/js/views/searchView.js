class SearchView {
  #parentEl = document.querySelector(".search");

  getQuery() {
    const val = this.#parentEl.querySelector(".search__field").value;
    this.clearInput();
    return val;
  }

  addHandlerRender(funct) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      funct();
    });
  }

  clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
