class Comments {
  constructor(props) {}
  create() {
    this.comments = document.createElement('div');
    this.comments.classList.add('activity-all-comments');
    return this.comments;
  }

  render(props) {
    this.comments.innerHTML = ``;
    props.forEach((comment) => {
      this.comments.innerHTML += ` 

      <div id="${comment.id}" class="comment-item">
        <p class="comment-item-time">${comment.time}</p>
        <h5 class="comment-item-text">${comment.text}</h5>
        <div class="comment-item-buttons">
          <button class="edit-comment gray-text-btn">Edit</button>
          <button class="delete-comment gray-text-btn">Delete</button>
      </div>
      `;
    });

    return this.comments.outerHTML;
  }

  init(props) {
    this.create();
    return this.render(props);
  }
}

export const comments = (props) => new Comments(props).init(props);
