const commentElement = document.querySelector(".list");
const pagination = document.getElementById("pagination");

fetch("https://blog-demo-create.herokuapp.com/comments")
  .then((convert) => convert.json())
  .then((el) => {
    let data = new CommentClass(el, pagination);
    data.renderComment;
    data.renderPagination;
  })
  .catch((err) => console.log("Something went wrong =>", err));
