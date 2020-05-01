const commentElement = document.querySelector(".list-mount");
const pagination = document.getElementById("pagination");

let data123;
fetch("https://blog-demo-create.herokuapp.com/comments")
  .then((comment) => comment.json())
  .then((el) => {
    let data = new CommentClass(el, pagination);
    data.renderComment;
    data.renderPagination;
  })
  .then(() => {
    const cards = document.querySelectorAll(".item-column");
    const cardBtn = document.querySelectorAll(".card-btn");

    cards.forEach((card) => {
      // Handle modal
      // Open modal
      card.addEventListener("click", (e) => {
        document.querySelector(".bg-modal").style.display = "flex";

        console.log(e.target.parentElement.id);
        if (e.target.parentElement.id) {
          loadCommentWithId(e.target.parentElement.id);
        } else if (e.target.id) {
          loadCommentWithId(e.target.id);
        } else {
          null;
        }
        // Close modal
        document.querySelector(".close").addEventListener("click", () => {
          document.querySelector(".bg-modal").style.display = "none";

          // Pause video on modal close
          document.querySelector(".modal-video").pause();
        });
      });
    });
  })
  .catch((err) => console.log("Something went wrong =>", err));

// This function handles the modal creation
function loadCommentWithId(elementId) {
  fetch(`https://blog-demo-create.herokuapp.com/comments/${elementId}`)
    .then((comment) => comment.json())
    .then((commentElement) => {
      let modalCardContent = document.querySelector(".modal-content");
      modalCardContent.innerHTML = "";

      // Destructure commentElement
      const { video, content, title, id } = commentElement;

      const modalDivHeading = document.createElement("h2");
      const modalDivParagraph = document.createElement("p");
      const modalBtn = document.createElement("div");
      const modalVideo = document.createElement("video");
      const modalVideoSource = document.createElement("source");

      modalVideo.setAttribute("width", "420");
      modalVideo.setAttribute("class", "modal-video");
      modalVideo.setAttribute("controls", "");
      modalVideo.setAttribute("autoplay", "");
      modalVideoSource.setAttribute("src", `/video${video}`);
      modalVideoSource.setAttribute("type", "video/mp4");

      modalBtn.setAttribute("class", "modal-btn");
      modalDivHeading.setAttribute("class", "item-title modal-title");
      modalDivParagraph.setAttribute("class", "item-content");

      modalVideo.append(modalVideoSource);
      modalDivHeading.textContent = title;
      modalDivParagraph.textContent = content;
      modalBtn.textContent = "SHARE";

      modalCardContent.append(
        modalDivHeading,
        modalDivParagraph,
        modalVideo,
        modalBtn
      );
    });
}
