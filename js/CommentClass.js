class CommentClass {
  constructor(comments, pagination) {
    this.commentObj = comments;
    this.current_page = 1;
    this.rows = 6;
    this.pagination = pagination;
  }

  get renderComment() {
    return this.renderData();
  }

  get renderPagination() {
    return this.setupPagination();
  }

  // Make data available to the fields from outside the class
  renderData() {
    this.displayList(
      this.commentObj,
      commentElement,
      this.rows,
      this.current_page
    );
  }

  // Handle pagination
  displayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      this.addComp(item);
    }
  }

  // Create page
  setupPagination() {
    let wrapper = this.pagination;

    wrapper.innerHTML = "";

    let page_count = Math.ceil(this.commentObj.length / this.rows);

    for (let i = 1; i < page_count + 1; i++) {
      let btn = this.paginationButton(i, this.displayList);
      wrapper.appendChild(btn);
    }
  }

  // Create page buttons
  paginationButton(page, cb) {
    this.func = cb;
    let button = document.createElement("button");
    button.innerText = page;

    if (this.current_page == page) button.classList.add("active");

    button.addEventListener("click", () => {
      this.current_page = page;

      this.func(this.commentObj, commentElement, this.rows, this.current_page);

      let current_btn = document.querySelector(".pagination button.active");

      current_btn.classList.remove("active");

      button.classList.add("active");
    });

    return button;
  }

  // Create html card component
  addComp(data) {
    const cardContainer = document.createElement("div");
    const cardContainerContent = document.createElement("div");
    const itemElement = document.createElement("div");
    const roundBlack = document.createElement("div");
    const roundBlue = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("p");
    const btn = document.createElement("button");
    const star = document.createElement("img");

    cardContainer.setAttribute("class", "card-column card-container");
    cardContainerContent.setAttribute("class", "card-container__content");
    itemElement.setAttribute("class", "item-column");
    roundBlack.setAttribute("class", "round-black");
    roundBlue.setAttribute("class", "round-blue");
    star.setAttribute("src", "images/Stars.svg");
    btn.setAttribute("class", "card-btn");
    btn.textContent = "Read More";
    itemElement.setAttribute("id", `${data.id}`);
    // title.setAttribute("class", "subtitle");
    title.setAttribute("class", "subtitle item-title");
    content.setAttribute("class", "item-content");

    itemElement.value = data.id;
    title.textContent = data.title;
    content.textContent = data.content;

    cardContainerContent.append(title, star);

    cardContainer.append(roundBlack, cardContainerContent, roundBlue);
    itemElement.append(cardContainer, content, btn);

    commentElement.appendChild(itemElement);
  }
}
