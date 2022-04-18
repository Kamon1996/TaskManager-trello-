class Tasks {
  constructor({ listID, tasks }) {
    this.listID = listID;
    this.tasks = tasks;
  }
  create() {
    this.tasksElem = document.createElement('div');
    this.tasksElem.classList.add('cards');
    this.tasksElem.id = this.listID;
    return this.tasksElem;
  }

  render() {
    this.tasksElem.innerHTML = ``;
    this.tasks.forEach((task) => {
      if (task.listId == this.listID) {
        this.tasksElem.innerHTML += `

        <div draggable="true" id="${task.id}" class="card-item">
            <div class="card-head">
              <p class="card-head-data">${task.createData}</p>
              <div class="card-head-buttons">
                <button id="${task.id}" class="btn-rename-task">
                    <i class="gray-btn-ico fas fa-pen"></i>
                </button>
                <button id="${task.id}" class="btn-delete-task">
                    <i class="gray-btn-ico fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div id="${task.id}" class="card-title">${task.head}</div>
        </div>
    
      `;
      }
    });
    this.tasksElem.innerHTML += `

    <button id=${this.listID} class="add-task-btn">
        <i class="fas fa-plus-circle"></i>
        Add a card
    </button>

    `;

    return this.tasksElem.outerHTML;
  }

  init() {
    this.create();
    return this.render();
  }
}

export const TasksComponent = ({ ...props }) => new Tasks({ ...props }).init();
