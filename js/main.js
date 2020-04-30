const commentElement = document.querySelector(".list-mount");
const pagination = document.getElementById("pagination");

let data123;
fetch("https://blog-demo-create.herokuapp.com/comments")
  .then((comment) => comment.json())
  .then((el) => {
    let data = new CommentClass(el, pagination);
    data.renderData();
    data.renderPagination;
  })
  .then(() => {
    const cards = document.querySelectorAll(".item-column");

    cards.forEach((card) => {
      // Handle modal
      // Open modal
      card.addEventListener("click", (e) => {
        document.querySelector(".bg-modal").style.display = "flex";

        console.log(e.target.id);

        commentWithId(e.target.id);
        // Close modal
        document.querySelector(".close").addEventListener("click", () => {
          document.querySelector(".bg-modal").style.display = "none";
        });
      });
    });
  })
  .catch((err) => console.log("Something went wrong =>", err));

function commentWithId(elementId) {
  fetch(`https://blog-demo-create.herokuapp.com/comments/${elementId}`)
    .then((comment) => comment.json())
    .then((commentElement) => {
      let modalCardContent = document.querySelector(".modal-content");
      modalCardContent.innerHTML = "";

      // Destructure commentElement
      const { video, content, title, id } = commentElement;

      const contentDivElement = document.createElement("p");
      contentDivElement.setAttribute("class", "item-content");
      contentDivElement.textContent = content;
      modalCardContent.append(contentDivElement);

      // modalCardContent.append(content);
    });
}
